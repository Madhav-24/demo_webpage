import { useState } from 'react'
import { NavIcon } from './NavIcon'
import type { Camera } from './types'

type CameraPageProps = {
  cameras: Camera[]
  onSelect: (camera: Camera) => void
}

type CameraViewerProps = {
  camera: Camera
  onClose: () => void
}

/** Lists registered cameras and opens the selected camera viewer. */
export function CameraPage({ cameras, onSelect }: CameraPageProps) {
  return (
    <section className="dashboard-content page-surface">
      <div className="page-title">
        <p className="eyebrow">Live monitoring</p>
        <h1>Camera feeds</h1>
        <p className="dashboard-content__subtitle">Select a site camera to open its live stream and controls.</p>
      </div>
      <div className="camera-cards">
        {cameras.map((camera) => <CameraCard camera={camera} onSelect={onSelect} key={camera.id} />)}
      </div>
    </section>
  )
}

function CameraCard({ camera, onSelect }: { camera: Camera; onSelect: (camera: Camera) => void }) {
  return <button className="camera-card" type="button" onClick={() => onSelect(camera)}>
    <div className="camera-card__preview"><span className="camera-card__live"><i /> Live</span><NavIcon name="Camera" /><span className="camera-card__open">Open view &#8594;</span></div>
    <div className="camera-card__details"><div><strong>{camera.number}</strong><span>{camera.site}</span></div><b>{camera.chainage}</b></div>
  </button>
}

/**
 * Full-screen camera viewer. A configured stream is embedded directly;
 * cameras without a stream use the local preview so they remain inspectable.
 */
export function CameraViewer({ camera, onClose }: CameraViewerProps) {
  const [zoom, setZoom] = useState(1)

  return <div className="camera-viewer">
    <button className="camera-viewer__close" type="button" onClick={onClose} aria-label="Close camera view">&#10005;</button>
    <div className="camera-viewer__stream">
      {camera.stream ? <iframe src={camera.stream} title={`${camera.number} live stream`} /> : <StreamPlaceholder camera={camera} />}
      <div className="camera-viewer__label"><span>{camera.number}</span><span><i /> Connected</span></div>
    </div>
    <PtzControls zoom={zoom} onZoomChange={setZoom} />
  </div>
}

/** Provides a visual fallback when the camera has no stream URL configured. */
function StreamPlaceholder({ camera }: { camera: Camera }) {
  return <div className="stream-placeholder"><span className="camera-card__live"><i /> Live preview</span><NavIcon name="Camera" /><strong>{camera.site}</strong><small>{camera.chainage} <span>•</span> {camera.number}</small></div>
}

/**
 * Presents PTZ controls. Only zoom changes application state because pan and
 * tilt are visual controls until a camera-control service is connected.
 */
function PtzControls({ zoom, onZoomChange }: { zoom: number; onZoomChange: (value: number) => void }) {
  return <div className="ptz-controls">
    <strong>Pan / Tilt / Zoom</strong>
    <div className="ptz-pad"><button type="button" aria-label="Tilt up">&#8593;</button><button type="button" aria-label="Pan left">&#8592;</button><button type="button" aria-label="Pan right">&#8594;</button><button type="button" aria-label="Tilt down">&#8595;</button></div>
    <div className="zoom-controls"><button type="button" onClick={() => onZoomChange(Math.min(3, zoom + .25))}>+ Zoom in</button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => onZoomChange(Math.max(1, zoom - .25))}>- Zoom out</button></div>
  </div>
}
