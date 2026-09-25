import { useState } from 'react'
import type { FormEvent } from 'react'
import { NavIcon } from './NavIcon'
import type { Camera, NewCamera } from './types'

type AddCameraPageProps = {
  onAdd: (camera: NewCamera) => void
}

/**
 * Registers cameras for the current dashboard session and shows the entries
 * submitted from this form without requiring a server-side data store.
 */
export function AddCameraPage({ onAdd }: AddCameraPageProps) {
  const [form, setForm] = useState<NewCamera>({ number: '', site: '', chainage: '', stream: '' })
  const [submitted, setSubmitted] = useState<Camera[]>([])

  /** Publish the form data to the dashboard and reset the entry form. */
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Use the same session identifier shape as the dashboard camera list.
    const camera = { ...form, id: Date.now() }
    onAdd(form)
    setSubmitted((current) => [...current, camera])
    setForm({ number: '', site: '', chainage: '', stream: '' })
  }

  return (
    <section className="dashboard-content page-surface">
      <div className="page-title">
        <p className="eyebrow">Camera management</p>
        <h1>Add camera</h1>
        <p className="dashboard-content__subtitle">Register a site camera for live construction monitoring.</p>
      </div>
      <form className="camera-form" onSubmit={submit}>
        <div className="camera-form__grid">
          <div className="field"><label htmlFor="camera-number">Camera number</label><input id="camera-number" value={form.number} onChange={(event) => setForm({ ...form, number: event.target.value })} placeholder="e.g. CAM-003" required /></div>
          <div className="field"><label htmlFor="site-name">Site name</label><input id="site-name" value={form.site} onChange={(event) => setForm({ ...form, site: event.target.value })} placeholder="Enter site name" required /></div>
          <div className="field"><label htmlFor="chainage">Chainage</label><input id="chainage" value={form.chainage} onChange={(event) => setForm({ ...form, chainage: event.target.value })} placeholder="e.g. CH 15+600" required /></div>
          <div className="field"><label htmlFor="stream-link">Streaming link</label><input id="stream-link" type="url" value={form.stream} onChange={(event) => setForm({ ...form, stream: event.target.value })} placeholder="https://stream.example.com/camera" /></div>
        </div>
        <button className="submit-button camera-submit" type="submit">Submit camera <span aria-hidden="true">&#8594;</span></button>
      </form>
      <div className="submitted-section">
        <div className="panel-heading"><div><h2>Recently submitted</h2><p>{submitted.length ? 'Cameras added during this session' : 'Your new camera details will appear here'}</p></div></div>
        {submitted.length > 0 ? submitted.map((camera) => <CameraRow camera={camera} key={camera.id} />) : <div className="empty-state">No cameras submitted yet.</div>}
      </div>
    </section>
  )
}

function CameraRow({ camera }: { camera: Camera }) {
  return <div className="camera-row"><span className="camera-row__icon"><NavIcon name="Camera" /></span><div><strong>{camera.number}</strong><small>{camera.site}</small></div><span className="camera-row__chainage">{camera.chainage}</span><span className="camera-row__status"><i /> Registered</span></div>
}
