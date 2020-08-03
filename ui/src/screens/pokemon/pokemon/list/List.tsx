import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps, Link } from '@reach/router'

const List = styled.ul`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
`

const ListItem = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;

  > *:first-child {
    margin-right: 1rem;
  }
`

interface Pokemon {
  id: string;
  name: string;
  num: string;
  img: string;
}

interface ListProps {
  clickLink: Function;
  pokemon: Pokemon[];
}

const RenderList: React.FC<RouteComponentProps & ListProps> = (props) => {
  return (
    <List>
      {props.pokemon.map(pokemon => (
        <Link key={pokemon.id} to={pokemon.id} onMouseDown={props.clickLink as any}>
          <ListItem key={pokemon.id}>
            <img src={pokemon.img} />
            {pokemon.name} - {pokemon.num}
          </ListItem>
        </Link>
      ))}
    </List>
  )
}

export default RenderList
