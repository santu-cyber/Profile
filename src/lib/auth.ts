import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      name: 'Admin',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminUsername = process.env.ADMIN_USERNAME ?? 'santu'
        const adminPassword = process.env.ADMIN_PASSWORD ?? 'portfolio2026'
        if (credentials?.username === adminUsername && credentials?.password === adminPassword) {
          return { id: 'admin', name: 'Santu Biswas', email: 'admin@portfolio.local' }
        }
        return null
      },
    }),
  ],
  pages: { signIn: '/?signin=1' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = 'admin'
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as { role?: string }).role = (token.role as string) ?? 'guest'
      }
      return session
    },
  },
}
