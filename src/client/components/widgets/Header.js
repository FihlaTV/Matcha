import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Logo, Spacer } from '../widgets';
import SearchBar from '../SearchBar';
import Notifications from '../Notifications';
import { disconnectUser } from '../../actions/users';

const HeaderStyled = styled.div`
  position:fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
  min-height:65px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  background-color:white;
  z-index:1;
`;

const HeaderLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex:3;
`;

const HeaderRight = styled.div`
  flex:1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Icon = styled.i`
  color: rgba(244, 92, 67, 0.85);
  margin-left:25px;
  font-size: 1.6em;
  cursor: pointer;
  &:hover {
      transition: all 60ms ease;
      opacity: .85;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = ({
  displaySearchBar,
  onChange,
  filter,
  resetValue,
  connectedPeople,
  disconnectUser,
}) => (
  <HeaderStyled>
    <HeaderLeft>
      <Spacer />
      <Logo width={40}/>
      <Spacer />
      {displaySearchBar &&
        <SearchBar
          onChange={onChange}
          filter={filter}
          resetValue={resetValue}
        />
      }
    </HeaderLeft>
    <HeaderRight>
      <Container>
        <Icon className="fa fa-users" aria-hidden="true" title="Notification"/>
        <Spacer size='3'/>
        { connectedPeople }
      </Container>
      <Notifications />
    <Link to={`/profil`}>
        <Icon className="fa fa-user" aria-hidden="true" title="Me"/>
      </Link>
      <Link to={`/login`}>
        <Icon className="fa fa-sign-out" aria-hidden="true" title="Disconnect" onClick={disconnectUser}/>
      </Link>
      <Spacer size={10}/>
    </HeaderRight>
  </HeaderStyled>
);

Header.propTypes = {
  displaySearchBar: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  filter: PropTypes.string,
  resetValue: PropTypes.func,
  connectedPeople: PropTypes.number,
  disconnectUser: PropTypes.func,
}

const actions = {
  disconnectUser,
};

const mapStateToProps = state => ({
  connectedPeople: state.users.connectedUsers
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);

