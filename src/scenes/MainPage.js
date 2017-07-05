import React, {Component} from 'react';

import {
    StyleSheet,
    Image,
    View,
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import PopularPage from './account'
import TrendingPage from './news'
import FavoritePage from './like'
import MyPage from './map'


export var FLAG_TAB = {
    flag_popularTab: 'flag_popularTab', flag_trendingTab: 'flag_trendingTab',
    flag_favoriteTab: 'flag_favoriteTab', flag_myTab: 'flag_myTab'
}

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.subscribers = [];
        this.changedValues = {
            favorite: {popularChange: false, trendingChange: false},
            my: {languageChange: false, keyChange: false, themeChange: false}
        };
        let selectedTab = this.props.selectedTab ? this.props.selectedTab : FLAG_TAB.flag_popularTab;
        this.state = {
            selectedTab: selectedTab,
            theme: this.props.theme
        };
    }

    onSelected(object) {
        // if (this.updateFavorite && 'popularTab' === object)this.updateFavorite(object);

        if (object !== this.state.selectedTab) {
            this.subscribers.forEach((item, index, arr)=> {
                if (typeof(item) == 'function')item(this.state.selectedTab, object);
            })
        }
        if(object===FLAG_TAB.flag_popularTab)this.changedValues.favorite.popularChange=false;
        if(object===FLAG_TAB.flag_trendingTab)this.changedValues.favorite.trendingChange=false;

        this.setState({
            selectedTab: object,
        })

    }

    _renderTab(Component, selectedTab, title, renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                selectedTitleStyle={{}}
                renderIcon={() => <Image style={styles.tabBarIcon}
                                         source={renderIcon}/>}
                renderSelectedIcon={() => <Image
                    style={[styles.tabBarSelectedIcon, {}]}
                    source={renderIcon}/>}
                onPress={() => this.onSelected(selectedTab)}>
                <Component {...this.props} theme={this.state.theme} homeComponent={this}/>
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabBarStyle={{opacity: 0.9,}}
                    sceneStyle={{paddingBottom: 0}}
                >
                    {this._renderTab(PopularPage, FLAG_TAB.flag_popularTab, 'Popular', require('../../assets/images/ic_polular.png'))}
                    {this._renderTab(TrendingPage, FLAG_TAB.flag_trendingTab, 'Trending', require('../../assets//images/ic_trending.png'))}
                    {this._renderTab(FavoritePage, FLAG_TAB.flag_favoriteTab, 'Favorite', require('../../assets/images/ic_favorite.png'))}
                    {this._renderTab(MyPage, FLAG_TAB.flag_myTab, 'My', require('../../assets/images/ic_my.png'))}
                </TabNavigator>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'#fff',
    },
    tabBarIcon: {
        width: 26, height: 26,
        resizeMode: 'contain',
    },
    tabBarSelectedIcon: {
        width: 26, height: 26,
        resizeMode: 'contain',
        // tintColor:'#4caf50'
    }
})
