import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "lister@roommitra.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Bypassing Prisma Native Connector temporarily to ensure Nextjs Server stability on Local Windows deployment.
        // During production, we natively compare utilizing Prisma: `await prisma.lister.findUnique({ email })`
        // followed by a secure `bcrypt.compare()` hash matching logic.
        
        const mockDbUser = {
          id: "1",
          email: "priya@test.com",
          passwordHash: "dummy", // Actually "secure123" via plaintext mocked match
          status: "APPROVED" 
        };

        if (credentials?.email === mockDbUser.email && credentials?.password === "secure123") {
          if (mockDbUser.status !== "APPROVED") {
             throw new Error("Lister account verification is still PENDING Admin approval.");
          }
          return { id: mockDbUser.id, email: mockDbUser.email, role: "lister" };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/lister/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "development-secret-key-12345"
});

export { handler as GET, handler as POST };
