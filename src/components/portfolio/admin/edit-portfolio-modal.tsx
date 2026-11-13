'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, RotateCcw, Loader2, CheckCircle2, AlertCircle, FileJson } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { usePortfolio } from '@/components/portfolio/portfolio-context'
import type { Portfolio } from '@/data/portfolio'

export function EditPortfolioModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const fallbackPortfolio = usePortfolio()
  const [text, setText] = React.useState('')
  const [original, setOriginal] = React.useState('')
  const [validation, setValidation] = React.useState<{ ok: true; value: Portfolio } | { ok: false; error: string } | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [resetting, setResetting] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    let cancelled = false
    setLoading(true)
    ;(async () => {
      try {
        const res = await fetch('/api/portfolio', { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as Portfolio
        const json = JSON.stringify(data, null, 2)
        if (cancelled) return
        setText(json); setOriginal(json); setValidation({ ok: true, value: data })
      } catch {
        const json = JSON.stringify(fallbackPortfolio, null, 2)
        if (cancelled) return
        setText(json); setOriginal(json); setValidation({ ok: true, value: fallbackPortfolio })
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [open, fallbackPortfolio])

  React.useEffect(() => {
    if (!text) { setValidation({ ok: false, error: 'Empty input' }); return }
    try {
      const value = JSON.parse(text) as Portfolio
      setValidation({ ok: true, value })
    } catch (err) {
      setValidation({ ok: false, error: err instanceof Error ? err.message : 'Invalid JSON' })
    }
  }, [text])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); handleSave() }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, text, validation])

  const isDirty = text !== original
  const canSave = validation?.ok === true && isDirty && !saving

  async function handleSave() {
    if (!validation || !validation.ok) return
    setSaving(true)
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.value),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Save failed' }))
        throw new Error(err.error || `HTTP ${res.status}`)
      }
      const result = (await res.json()) as { ok: boolean; updatedAt?: string }
      toast({
        title: 'Saved!',
        description: result.updatedAt ? `Portfolio updated (${new Date(result.updatedAt).toLocaleTimeString()})` : 'Portfolio updated.',
      })
      setOriginal(text)
      window.location.reload()
    } catch (err) {
      toast({ title: 'Save failed', description: err instanceof Error ? err.message : String(err), variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  async function handleReset() {
    if (!confirm('Reset the entire portfolio back to the original defaults? Your saved edits will be lost.')) return
    setResetting(true)
    try {
      const res = await fetch('/api/portfolio?action=reset', { method: 'POST' })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Reset failed' }))
        throw new Error(err.error || `HTTP ${res.status}`)
      }
      toast({ title: 'Reset to defaults', description: 'The portfolio is now back to the original seed content.' })
      window.location.reload()
    } catch (err) {
      toast({ title: 'Reset failed', description: err instanceof Error ? err.message : String(err), variant: 'destructive' })
    } finally {
      setResetting(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.currentTarget
      const start = target.selectionStart
      const end = target.selectionEnd
      const next = text.slice(0, start) + '  ' + text.slice(end)
      setText(next)
      requestAnimationFrame(() => { target.selectionStart = target.selectionEnd = start + 2 })
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col"
        >
          <div className="flex items-center justify-between gap-4 p-4 border-b border-border bg-background">
            <div className="flex items-center gap-2 min-w-0">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                <FileJson className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">Edit Portfolio Data</div>
                <div className="text-xs text-muted-foreground">
                  JSON editor · press <kbd className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono">⌘/Ctrl + S</kbd> to save, <kbd className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono">Esc</kbd> to close
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {validation?.ok ? (
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Valid JSON
                </span>
              ) : (
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5" /> {validation?.error ?? 'Invalid'}
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={handleReset} disabled={saving || resetting || loading} className="gap-1.5">
                {resetting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
                Reset to defaults
              </Button>
              <Button size="sm" onClick={handleSave} disabled={!canSave} className="gap-1.5">
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                Save
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close" className="ml-1">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden bg-background">
            {loading ? (
              <div className="h-full grid place-items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Loading current data…</div>
              </div>
            ) : (
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                className="w-full h-full resize-none bg-background text-foreground px-5 py-4 font-mono text-xs leading-relaxed focus:outline-none [tab-size:2]"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
              />
            )}
          </div>

          <div className="flex items-center justify-between gap-4 px-4 py-2 border-t border-border bg-background text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              {isDirty ? (
                <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Unsaved changes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No changes
                </span>
              )}
              <span className="hidden sm:inline">{text.length.toLocaleString()} chars · {text.split('\n').length.toLocaleString()} lines</span>
            </div>
            <div className="hidden md:block">Tip: edit any value, add new items to arrays, or remove unwanted entries — the page will reflect your changes after saving.</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
