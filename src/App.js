import React, { Component } from 'react'
import {
  Col,
  Row,
  ScreenClassRender,
  setConfiguration,
  Container,
} from 'react-grid-system'
import { ContainerQuery } from 'react-container-query'
import styled from 'react-emotion'

const Pink = styled('div')({
  backgroundColor: '#f99',
  color: '#c66',
  padding: 8,
  marginBottom: 24,
})

const Yellow = styled('div')({
  backgroundColor: '#ff9',
  color: '#cc6',
  padding: 8,
})

const Sidebar = styled('div')(({ open }) => ({
  width: open ? 400 : 0,
  height: '100vh',
  backgroundColor: '#ff9',
  color: '#cc6',
  transition: 'width 300ms ease-in-out',
}))

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#9f9',
})

const Button = styled('button')({
  padding: 12,
  backgroundColor: '#99f',
  color: '#66c',
  fontSize: 24,
  borderRadius: 4,
  border: 'none',
  boxShadow: '0 2px 4px #66c',
  cursor: 'pointer',
  outline: 'none',
})

const PageContent = styled('div')({
  paddingTop: 24,
  paddingBottom: 24,
  flex: 1,
})

const HugeNumber = styled('div')({
  fontSize: 48,
  color: '#eee',
  textAlign: 'center',
})

const configuration = {
  breakpoints: [576, 768, 992, 1200],
  containerWidths: [540, 750, 960, 1140],
  gutterWidth: 30,
  gridColumns: 12,
  defaultScreenClass: 'xl',
}

class App extends Component {
  componentDidMount() {}

  state = {
    open: false,
  }

  toggleSidebar = () => {
    this.setState({ open: !this.state.open })
  }

  componentDidUpdate(next, prevState) {
    if (this.state.open !== prevState.open) {
      if (this.state.open) {
        // do magic
        setConfiguration({
          ...configuration,
          breakpoints: [976, 1168, 1392, 1600],
        })

        // force a resize event, as react-grid-system listens to that
        window.dispatchEvent(new Event('resize'))
      } else {
        setConfiguration(configuration)

        // force a resize event, as react-grid-system listens to that
        window.setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
        }, 300)
      }
    }
  }

  render() {
    return (
      <PageContainer>
        <Sidebar open={this.state.open} />
        <PageContent>
          <Container>
            <Row>
              <Col xs={12} lg={6}>
                <Pink>
                  <Button onClick={this.toggleSidebar}>Toggle Sidebar</Button>
                </Pink>
              </Col>
              <Col xs={12} lg={6}>
                <Pink>
                  <ScreenClassRender
                    render={screenClass => (
                      <HugeNumber>{screenClass}</HugeNumber>
                    )}
                  />
                </Pink>
              </Col>
            </Row>
          </Container>
        </PageContent>
      </PageContainer>
    )
  }
}

export default App
