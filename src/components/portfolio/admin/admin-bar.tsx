'use client'

import * as React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, LogOut, ShieldCheck, Loader2, ImageUp, FileUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { LoginModal } from './login-modal'
import { EditPortfolioModal } from './edit-portfolio-modal'

const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const PHOTO_MAX_SIZE = 5 * 1024 * 1024
const CV_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const CV_MAX_SIZE = 10 * 1024 * 1024

export function AdminBar() {
  const { data: session, status } = useSession()
  const [loginOpen, setLoginOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [uploadingPhoto, setUploadingPhoto] = React.useState(false)
  const [uploadingCV, setUploadingCV] = React.useState(false)
  const photoInputRef = React.useRef<HTMLInputElement>(null)
  const cvInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (url.searchParams.get('signin') === '1') {
        setLoginOpen(true)
        url.searchParams.delete('signin')
        window.history.replaceState({}, '', url.toString())
      }
    }
  }, [])

  const isLoading = status === 'loading'
  const isAuthed = status === 'authenticated' && !!session?.user

  async function uploadFile(
    file: File,
    endpoint: string,
    acceptedTypes: string[],
    maxSize: number,
    setUploading: (v: boolean) => void,
    inputRef: React.RefObject<HTMLInputElement | null>,
    successTitle: string,
    successDescription: string
  ) {
    if (!acceptedTypes.includes(file.type)) {
      toast({ title: 'Unsupported file type', description: `Allowed: ${acceptedTypes.join(', ')}`, variant: 'destructive' })
      if (inputRef.current) inputRef.current.value = ''
      return
    }
    if (file.size > maxSize) {
      toast({ title: 'File too large', description: `Maximum size is ${(maxSize / 1024 / 1024).toFixed(0)} MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)} MB.`, variant: 'destructive' })
      if (inputRef.current) inputRef.current.value = ''
      return
    }
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(endpoint, { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Upload failed (HTTP ${res.status})`)
      toast({ title: successTitle, description: successDescription })
      window.location.reload()
    } catch (err) {
      toast({ title: 'Upload failed', description: err instanceof Error ? err.message : String(err), variant: 'destructive' })
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    uploadFile(file, '/api/upload-photo', PHOTO_TYPES, PHOTO_MAX_SIZE, setUploadingPhoto, photoInputRef, 'Photo updated!', 'Your new profile photo is now live.')
  }

  function handleCVSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    uploadFile(file, '/api/upload-cv', CV_TYPES, CV_MAX_SIZE, setUploadingCV, cvInputRef, 'CV uploaded!', 'Visitors can now download your CV from the Download CV buttons.')
  }

  return (
    <>
      <AnimatePresence>
        {isAuthed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed top-16 right-4 z-50 hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 backdrop-blur px-2 py-1 text-xs text-emerald-700 dark:text-emerald-300"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="font-medium">Admin mode</span>
          </motion.div>
        )}
      </AnimatePresence>

      <input ref={photoInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handlePhotoSelect} className="sr-only" aria-label="Upload photo from disk" />
      <input ref={cvInputRef} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleCVSelect} className="sr-only" aria-label="Upload CV from disk" />

      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 max-w-[calc(100vw-2rem)] overflow-x-auto pb-1">
        {isLoading ? null : isAuthed ? (
          <>
            <Button size="sm" variant="outline" onClick={() => photoInputRef.current?.click()} disabled={uploadingPhoto || uploadingCV} className="shadow-lg gap-1.5 bg-background/95 backdrop-blur">
              {uploadingPhoto ? (<><Loader2 className="h-3.5 w-3.5 animate-spin" /> Photo…</>) : (<><ImageUp className="h-3.5 w-3.5" /> Photo</>)}
            </Button>
            <Button size="sm" variant="outline" onClick={() => cvInputRef.current?.click()} disabled={uploadingPhoto || uploadingCV} className="shadow-lg gap-1.5 bg-background/95 backdrop-blur">
              {uploadingCV ? (<><Loader2 className="h-3.5 w-3.5 animate-spin" /> CV…</>) : (<><FileUp className="h-3.5 w-3.5" /> CV</>)}
            </Button>
            <Button size="sm" onClick={() => setEditOpen(true)} disabled={uploadingPhoto || uploadingCV} className="shadow-lg gap-1.5">
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Button>
            <Button size="sm" variant="ghost" onClick={() => signOut({ callbackUrl: '/' })} disabled={uploadingPhoto || uploadingCV} className="shadow-lg bg-background/95 backdrop-blur gap-1.5">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </Button>
          </>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setLoginOpen(true)} className="text-xs text-muted-foreground hover:text-foreground">
            Admin
          </Button>
        )}
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <EditPortfolioModal open={editOpen} onClose={() => setEditOpen(false)} />
    </>
  )
}
