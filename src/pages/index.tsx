import React from "react"
import styled from "styled-components"
import { Layout } from "../layout/Layout"

import Header from "../components/header/Header"
import Content from "../components/content/Content"
import { Counter } from "../components/counter/Counter"

export default function Home() {
  return (
    <Layout>
      <Header></Header>
      <Content></Content>
    </Layout>
  )
}
