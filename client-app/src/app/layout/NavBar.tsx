import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

export default function NavBar(){
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                </Menu.Item>
                <Menu.Item name='Posts'/>
                <Menu.Item>
                    <Button positive content='Create Post'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}