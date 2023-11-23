"use client"
import ChangeOrderList from "./components/ChangeOrderList"
import ChangeOrderModal from "./components/ChangeOrderModal"

export default function Home() {
  return (
    <div id='app'>
      <ChangeOrderModal/>
      <ChangeOrderList/>
    </div>
  )
}
