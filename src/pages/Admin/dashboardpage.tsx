import { useState } from 'react'
import { LtLogo } from '../../logo/LtLogo'
import { AddCameraPage } from './addcamera'
import { CameraPage, CameraViewer } from './camera'
import { NavIcon } from './NavIcon'
import type { Camera } from './types'
import { initialCameras } from './types'

type DashboardPageProps = { onLogout: () => void }

export function DashboardPage({ onLogout }: DashboardPageProps) {
  const [activePage, setActivePage] = useState('Dashboard')
  const [cameras, setCameras] = useState(initialCameras)
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null)

  function addCamera(camera: Omit<Camera, 'id'>) {
    setCameras((current) => [...current, { ...camera, id: Date.now() }])
  }

  return <main className="dashboard-page">
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__brand"><LtLogo compact /></div>
      <nav className="dashboard-nav" aria-label="Main navigation">
        {['Dashboard', 'Camera', 'Add camera'].map((item) => <button className={activePage === item ? 'dashboard-nav__item dashboard-nav__item--active' : 'dashboard-nav__item'} type="button" key={item} onClick={() => setActivePage(item)}><NavIcon name={item} /><span>{item}</span></button>)}
      </nav>
      <div className="dashboard-sidebar__bottom"><div className="user-chip"><span>AD</span><div><strong>Admin</strong><small>Project manager</small></div></div><button className="sidebar-signout" type="button" onClick={onLogout}>Sign out <span aria-hidden="true">&#8594;</span></button></div>
    </aside>
    <section className="dashboard-main">
      <header className="dashboard-topbar"><div><span className="dashboard-topbar__path">Workspace / </span>{activePage}</div><div className="dashboard-topbar__status"><span className="status-dot" /> Live system</div></header>
      {activePage === 'Dashboard' && <DashboardOverview />}
      {activePage === 'Add camera' && <AddCameraPage onAdd={addCamera} />}
      {activePage === 'Camera' && <CameraPage cameras={cameras} onSelect={setSelectedCamera} />}
    </section>
    {selectedCamera && <CameraViewer camera={selectedCamera} onClose={() => setSelectedCamera(null)} />}
  </main>
}

function DashboardOverview() {
  return <section className="dashboard-content"><div className="dashboard-heading"><div><p className="eyebrow">Welcome back, Admin</p><h1>Project overview</h1><p className="dashboard-content__subtitle">Your construction portfolio at a glance.</p></div><button className="date-filter" type="button">Last 30 days <span aria-hidden="true">⌄</span></button></div><div className="metric-grid"><article><span>Active projects</span><strong>24</strong><small>Across 8 regions <b className="positive">+8.4%</b></small></article><article><span>On schedule</span><strong>86%</strong><small>Project health <b className="positive">+4.2%</b></small></article><article><span>AI alerts</span><strong>07</strong><small>Requires attention <b className="negative">-2.1%</b></small></article></div><div className="dashboard-grid"><section className="chart-card"><div className="panel-heading"><div><h2>Site progress</h2><p>Overall progress across active sites</p></div><span className="chart-legend"><i /> Completion</span></div><SiteProgressChart /></section><section className="activity-card"><div className="panel-heading"><div><h2>Site health</h2><p>Live overview</p></div><span className="panel-more">•••</span></div><div className="health-ring"><strong>86<span>%</span></strong><small>Healthy</small></div><div className="health-list"><span><i className="health-dot health-dot--green" />On track <b>18</b></span><span><i className="health-dot health-dot--amber" />Needs review <b>04</b></span><span><i className="health-dot health-dot--red" />At risk <b>02</b></span></div></section></div><div className="dashboard-banner"><span className="status-dot" /> All monitoring systems are operational</div></section>
}

function SiteProgressChart() {
  return <div className="site-chart"><div className="site-chart__labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><svg viewBox="0 0 640 220" role="img" aria-label="Site completion increased from 42 percent to 86 percent over six months" preserveAspectRatio="none"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2c95d2" stopOpacity=".25" /><stop offset="100%" stopColor="#2c95d2" stopOpacity="0" /></linearGradient></defs><path className="chart-grid-lines" d="M0 20H640M0 70H640M0 120H640M0 170H640M0 220H640" /><path className="chart-area" d="M0 150 C48 144 62 138 106 142 S158 120 212 125 S268 106 320 112 S376 88 426 95 S484 62 532 72 S585 42 640 48 V220 H0Z" /><path className="chart-line" d="M0 150 C48 144 62 138 106 142 S158 120 212 125 S268 106 320 112 S376 88 426 95 S484 62 532 72 S585 42 640 48" /><circle cx="640" cy="48" r="5" className="chart-point" /></svg><div className="site-chart__months"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div></div>
}
