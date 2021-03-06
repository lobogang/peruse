// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './tabBar.css';
import MdClose from 'react-icons/lib/md/close';
import MdAdd from 'react-icons/lib/md/add';

export default class TabBar extends Component
{
    static defaultProps =
    {
        tabInFocus : 0
    }

    // static propTypes =
    // {
    //     addTab :
    // }

    constructor( props )
    {
        super( props );
        this.state =
        {
            tabInFocus : 0 // to update when many tabs can exist
        };

        this.handleAddTabClick = ::this.handleAddTabClick;

    }


    handleTabClick( tabData, event )
    {
        event.stopPropagation();

        this.props.setActiveTab( tabData.key );
        this.props.updateAddress( event.target.value );
    }

    handleTabClose( tabData, event )
    {
        event.stopPropagation();

        const { closeTab } = this.props;

        closeTab( { index: tabData.key } );
    }

    handleAddTabClick( event )
    {
        event.stopPropagation();

        const { addTab, updateAddress } = this.props;
        const newTabUrl = 'about:blank';

        event.preventDefault();
        addTab( { url: newTabUrl, isActiveTab: true } );
        updateAddress( event.target.value );
    }

    render()
    {
        const { tabs } = this.props;

        return (
            <div className={ styles.container }>
                <div className={ styles.dragZone } />
                <div className={ styles.tabBar }>
                    {
                        tabs.map( ( tab, i ) =>
                        {
                            if ( tab.get( 'isClosed' ) )
                            {
                                return;
                            }

                            const isActiveTab = tab.get( 'isActiveTab' );
                            let tabStyleClass = styles.tab;
                            const tabData = { key: i, url: tab.get( 'url' ) };
                            if ( isActiveTab )
                            {
                                tabStyleClass = styles.activeTab;
                            }
                            return ( <div
                                key={ i }
                                className={ tabStyleClass }
                                onClick={ this.handleTabClick.bind( this, tabData ) }
                            >
                                <span className={ styles.tabText }>{ tab.get( 'title' ) || 'New Tab' }</span>
                                <MdClose
                                    className={ styles.tabCloseButton }
                                    onClick={ this.handleTabClose.bind( this, tabData ) }
                                />
                            </div> );
                        } )
                    }
                    <div className={ styles.addTab } onClick={ this.handleAddTabClick.bind( this ) }>
                        <div className={ styles.tabBox }>
                            <MdAdd className={ styles.tabAddButton } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
