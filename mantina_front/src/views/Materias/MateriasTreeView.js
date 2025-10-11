import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Typography from '@material-ui/core/Typography';
import GridContainer from "components/Grid/GridContainer.js";

import TreeViewStyles from '../../assets/css/material-dashboard-react.css';
import { getTreeView } from '../../utils/api';

class MateriasTreeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
          nodes: [],
          loading: true,
        };
    }

    renderContent = (contentNode) => {
        const label = {
            color: '#00acc1',
        };
        return contentNode.map(contNode => {
            return(
                <Link to={'/visor/' + contNode.content_name + "/" + contNode.content_title} style={label}>
                    <TreeItem key={contNode.id_content+"cont"} nodeId={contNode.id_content+"cont"}
                    label={
                        <div className="treeViewRoot">
                          <Icon className="treeViewIcon">done</Icon>

                          <Typography className="treeViewLabel" >
                                {contNode.content_title}
                          </Typography>
                        </div>
                      }>
                </TreeItem>
                </Link>
            );
        });
    }

    renderTopic = (topicNode) => {
        return topicNode.topics.map(topNode => {
            return(
                <TreeItem key={topNode.id_topic+"top"} nodeId={topNode.id_topic+"top"}
                label={
                    <div className="treeViewRoot">
                      <Icon className="treeViewIcon">topic</Icon>

                      <Typography className="treeViewLabel" >
                            {topNode.topic_name}
                      </Typography>
                    </div>
                  }>
                {this.renderContent(topNode.contents)}
                </TreeItem>
            );
        });
    }

    renderTree = () => {
        const { nodes } = this.state;

        return nodes.map(node => {
            const { id_subject, subject_name, topicNode } = node;

            return(
                <TreeItem key={id_subject+"sub"} nodeId={id_subject+"sub"}
                label={
                        <div className="treeViewRoot">
                          <Icon className="treeViewIcon">bookmarks</Icon>

                          <Typography className="treeViewLabel" >
                                {subject_name}
                          </Typography>
                        </div>
                      }>

                {this.renderTopic(node)}

                </TreeItem>
            );
        });
    }

    componentDidMount() {
        getTreeView()
        .then(json => {
            const nodes = [];

            json.data.treeView.forEach(result => {
                nodes.push(result);
            });

            return nodes;
        })
        .then(allNodes => {
            this.setState({
                nodes: allNodes,
                loading: false,
            });
        })
        .catch(error => {
          // do something with the error (report it, etc.)
        })
    }

    render() {
        const { loading } = this.state;
        return (
            //FIXME: AGREGAR SKELETON
            <div>
                {
                    <TreeView
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />} >

                        {this.renderTree()}

                    </TreeView>
                 }
            </div>
        )
    }
}
export default MateriasTreeView;



