import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store';

export default function NavBar(){
    const { postStore } = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/posts' name='Posts'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createPost' positive content='Create Post'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}