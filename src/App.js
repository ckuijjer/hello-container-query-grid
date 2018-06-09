import React, { Component, Fragment } from 'react'
import {
  Col,
  Row,
  ScreenClassRender,
  setConfiguration,
  Container,
} from 'react-grid-system'
import { ContainerQuery } from 'react-container-query'
import ContainerDimensions from 'react-container-dimensions'
import styled from 'react-emotion'
import debounce from 'lodash.debounce'

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
  height: '75vh',
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

class ContainerBasedGrid extends React.Component {
  isGrowing = false
  width = null

  setBreakpoints = debounce(containerWidth => {
    const windowWidth = window.innerWidth

    setConfiguration({
      ...configuration,
      breakpoints: configuration.breakpoints.map(
        x => x + windowWidth - containerWidth,
      ),
    })

    window.dispatchEvent(new Event('resize'))

    this.width = containerWidth
  }, this.props.wait || 100)

  render() {
    const { children } = this.props

    return (
      <ContainerDimensions>
        {({ width }) => {
          this.isGrowing = this.width < width
          this.setBreakpoints(width)

          return children
        }}
      </ContainerDimensions>
    )
  }
}

class App extends Component {
  state = {
    open: false,
  }

  toggleSidebar = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <Fragment>
        <PageContainer>
          <Sidebar open={this.state.open} />
          <PageContent>
            <ContainerBasedGrid>
              <Container>
                <Row>
                  <Col xs={12} lg={6}>
                    <Pink>
                      <Button onClick={this.toggleSidebar}>
                        Toggle Sidebar
                      </Button>
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
            </ContainerBasedGrid>
          </PageContent>
        </PageContainer>
      </Fragment>
    )
  }
}

export default App
