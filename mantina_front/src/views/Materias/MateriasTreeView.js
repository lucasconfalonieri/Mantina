import React, { useState, useEffect } from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Link } from "react-router-dom";
import Icon from "@mui/material/Icon";
import Typography from '@mui/material/Typography';
import GridContainer from "components/Grid/GridContainer.js";

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
                <Link key={contNode.id_content+"cont-link"} to={'/visor/' + contNode.content_name + "/" + contNode.content_title} style={label}>
                    <TreeItem key={contNode.id_content+"cont"} itemId={contNode.id_content+"cont"}
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
                <TreeItem key={topNode.id_topic+"top"} itemId={topNode.id_topic+"top"}
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
                <TreeItem key={id_subject+"sub"} itemId={id_subject+"sub"}
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
                <SimpleTreeView
                        slots={{ collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon }} >

                    {renderTree()}

                </SimpleTreeView>
             }
        </div>
    )
}
