import { Component, OnInit, NgModule } from '@angular/core';
import { nodes, links } from './data';
import * as shape from 'd3-shape';
import { Edge, Node, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { Neo4jService } from '../neo4j.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph',
  imports: [CommonModule, MatSidenavModule, MatFormFieldModule,MatSelectModule,FormsModule,NgxGraphModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit{  
  name = 'NGX-Graph Demo';
  nodes: Node[] = [];
  links: Edge[] = [];  
  layout: string | Layout = 'dagreCluster';

  // line interpolation
  curveType: string = 'Bundle';
  curve: any = shape.curveLinear;  

  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 8.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = false;
  autoCenter: boolean = false; 


  nodeLabel = '';
  nodeName = '';
  nodeResponse = '';

  sourceLabel = '';
  sourceProperty = '';
  targetLabel = '';
  targetProperty = '';
  relationshipType = '';
  relationResponse = '';

  constructor(private neo4jService: Neo4jService) {}

  ngOnInit() {
    this.getAllNodes();
  }

  getAllNodes(): void {
    this.neo4jService.getNeo4jData().subscribe(data => {
      console.log(data); 
      this.nodes = data.nodes;
      console.log(data.nodes); 
      this.links = data.relationships;      
      console.log(data.relationships); 
    });
  }

  addNode(): void {
    this.neo4jService.addNode(this.nodeLabel, this.nodeName).subscribe(response => {
      this.getAllNodes();
      this.nodeResponse = 'Node created: ' + JSON.stringify(response);
    });
  }

  addRelationship(): void {
    this.neo4jService.addRelationship(this.sourceLabel, this.sourceProperty, this.targetLabel, this.targetProperty, this.relationshipType)
      .subscribe(response => {
        this.getAllNodes();
        this.relationResponse = 'Relationship created: ' + JSON.stringify(response);
      });
  }

}
