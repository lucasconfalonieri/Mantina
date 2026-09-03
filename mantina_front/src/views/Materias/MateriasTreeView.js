import React, { useState, useEffect } from 'react';
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

export default function MateriasTreeView() {
    const [nodes, setNodes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        getTreeView()
        .then(json => {
            const nodesResult = [];

            json.data.treeView.forEach(result => {
                nodesResult.push(result);
            });

            return nodesResult;
        })
        .then(allNodes => {
            if (isMounted) {
                setNodes(allNodes);
                setLoading(false);
            }
        })
        .catch(error => {
          // do something with the error (report it, etc.)
        })

        return () => {
            isMounted = false;
        };
    }, []);

    const renderContent = (contentNode) => {
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

    const renderTopic = (topicNode) => {
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
                {renderContent(topNode.contents)}
                </TreeItem>
            );
        });
    }

    const renderTree = () => {
        return nodes.map(node => {
            const { id_subject, subject_name } = node;

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

                {renderTopic(node)}

                </TreeItem>
            );
        });
    }

    return (
        //FIXME: AGREGAR SKELETON
        <div>
            {
                <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />} >

                    {renderTree()}

                </TreeView>
             }
        </div>
    )
}
