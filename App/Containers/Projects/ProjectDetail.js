import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import React from 'react'
import _ from 'lodash'
import { fromJS } from "immutable";
import { H3,View, Text, FlatList, RefreshControl, TouchableHighlight ,Image,StyleSheet, StatusBar} from 'react-native'
//import all the basic component we have used
import moment from 'moment'
import { getAllProjects } from './ProjectsActions'

// const ProjectItem = ({ item,index}) => {
//  let { Name} = item
//  return (
//    <View>
//      <Text>
//        {Name}
//      </Text>
//    </View>
  
//  )
// }
function Item({ Name,Description,Date,LowPrice,HighPrice,StartDate,Skills}) {
    return (
      <View>
        <TouchableHighlight
        underlayColor={'transparent'}
        // onPress={ () => navigate('NewsDetial', {
        //    news_name: news_name,
    //              news_slug: news_slug,
    //              news_description: news_description,
        //    news_date_added: news_date_added,
        //    url: news_image,
        //  })} 
      >
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.newsName} numberOfLines={1}>{ Name }</Text>
              <Text>{Description}</Text>
            </View>
        </View>
      </TouchableHighlight>
        </View>
  )
}
class ProjectDetail extends React.Component {

  componentDidMount() {
    this.props.getAllProjects()
  }

  _onRefresh() {
    this.props.getAllProjects()
  }

  _renderEmpty() {
    return <H3>Мэдэгдэл алга байна.</H3>
  }

  
  render() {
    const { projects, loading } = this.props
    return (
        <View>
          <Text>Dtail hesegee hiine de</Text>
        </View>
    )
  }
}

export default connect(
   state => ({
    loading: state.project.getIn(['project_list', 'loading']),
    projects: state.project.getIn(['project_list', 'data']),
        // projects: state.project.getIn(['project_list', 'data']).toJS(),
   }),
   dispatch => {
     return {
      getAllProjects: bindActionCreators(getAllProjects, dispatch),
     }
   }
)(ProjectDetail);

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  newsName: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: 'black'
  },
  title: {
    fontSize: 14,
    color: '#656565'
  },
});
