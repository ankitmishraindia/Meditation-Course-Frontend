import Data from '../Data/pageData.json'

export default function Home() {

  const {instructor}=Data
  return (
    <h1 className="text-3xl text-red-400">{instructor.name}</h1>
  )
}
