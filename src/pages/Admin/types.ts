export type Camera = {
  id: number
  number: string
  site: string
  chainage: string
  stream: string
}

export type NewCamera = Omit<Camera, 'id'>

export const initialCameras: Camera[] = [
  { id: 1, number: 'CAM-001', site: 'Chennai Metro Package 3', chainage: 'CH 12+450', stream: '' },
  { id: 2, number: 'CAM-002', site: 'Bengaluru Elevated Corridor', chainage: 'CH 08+220', stream: '' },
]
