export interface TDocument {
  id: number
  name: string
  author: {
    id: number
    name: string
  }
  no_of_sources: number
}
