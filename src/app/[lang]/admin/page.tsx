import { getLeads, getCurrentUser } from '@/services/supabase/leads'
import { SectionContainer } from '@/components/layout/section-container'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  }
}

export default async function AdminDashboard({ params }: { params: { lang: string } }) {
  // Verify user
  const { user } = await getCurrentUser()
  if (!user) {
    redirect(`/${params.lang}/login`)
  }

  // Fetch leads
  const { data: leads, error } = await getLeads()

  return (
    <SectionContainer className="pt-32 pb-24 min-h-screen">
      <div className="flex flex-col gap-12">
        <header className="flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-mono text-foreground">Admin<span className="text-white/40">_Dashboard</span></h1>
            <p className="text-white/60 mt-2 font-mono text-sm">System Management & Leads Overview</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50">{user.email}</p>
            <span className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Secure Session
            </span>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light">Recent Inquiries (Leads)</h2>
            <div className="text-sm text-white/40 font-mono tracking-wider">
              TOTAL: {leads?.length || 0}
            </div>
          </div>

          <div className="grid gap-4">
            {error ? (
              <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-2xl text-red-400 text-sm">
                Error Loading Leads: {error.message}
              </div>
            ) : leads?.length === 0 ? (
              <div className="p-8 border border-white/5 bg-white/5 rounded-3xl text-center text-white/40">
                No active leads found in the database.
              </div>
            ) : (
              leads?.map((lead) => (
                <div key={lead.id} className="p-6 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md hover:border-white/20 transition-all flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-white group-hover:text-primary transition-colors">{lead.name}</h3>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md border ${
                        lead.status === 'unread' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        lead.status === 'read' ? 'bg-white/5 text-white/60 border-white/10' : 
                        'bg-green-500/10 text-green-400 border-green-500/20'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-sm text-primary/80 truncate block">{lead.email}</p>
                    <p className="text-sm text-white/60 leading-relaxed mt-2 line-clamp-2 md:line-clamp-none max-w-3xl">&quot;{lead.message}&quot;</p>
                  </div>
                  <div className="text-xs text-white/30 whitespace-nowrap font-mono mt-4 md:mt-0 pt-4 md:pt-0 border-t border-white/5 md:border-none w-full md:w-auto">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </SectionContainer>
  )
}
