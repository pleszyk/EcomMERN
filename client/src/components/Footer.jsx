import { Container, Row, Col } from 'react-bootstrap'
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si'

function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    Powered by <br/>
                    <SiMongodb/><SiExpress/> <SiReact/> <SiNodedotjs/>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}
export default Footer