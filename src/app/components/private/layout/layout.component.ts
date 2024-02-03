import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  nodes!: TreeNode[];

  ngOnInit() {
    this.nodes = [
      {
        key: '0',
        label: 'Introduction',
        type: 'url',
        children: [
          { key: '0-0', label: 'What is Angular', data: 'https://angular.io', type: 'url' },
          {
            key: '0-1',
            label: 'Getting Started',
            data: 'https://angular.io/guide/setup-local',
            type: 'url',
          },
          {
            key: '0-2',
            label: 'Learn and Explore',
            data: 'https://angular.io/guide/architecture',
            type: 'url',
          },
          { key: '0-3', label: 'Take a Look', data: 'https://angular.io/start', type: 'url' },
        ],
      },
      {
        key: '1',
        label: 'Components In-Depth',
        children: [
          {
            key: '1-0',
            label: 'Component Registration',
            data: 'https://angular.io/guide/component-interaction',
            type: 'url',
          },
          {
            key: '1-1',
            label: 'User Input',
            data: 'https://angular.io/guide/user-input',
            type: 'url',
          },
          {
            key: '1-2',
            label: 'Hooks',
            data: 'https://angular.io/guide/lifecycle-hooks',
            type: 'url',
          },
          {
            key: '1-3',
            label: 'Attribute Directives',
            data: 'https://angular.io/guide/attribute-directives',
            type: 'url',
          },
        ],
      },
    ];
  }

  onNodeSelect(event: any): void {
    // 'event' contiene información sobre el nodo seleccionado
    console.log('Nodo seleccionado:', event.node);
    console.log('Estado de expansión:', event.node.expanded);

    // Puedes realizar acciones adicionales aquí
  }

  nodeExpand(event: any) {
    console.log('Nodo seleccionado:', event.node);
  }

  nodeCollapse(event: any) {
    console.log('Nodo seleccionado:', event.node);
  }

  nodeSelect(event: any) {
    console.log('Nodo seleccionado:', event.node);
  }

  nodeUnselect(event: any) {
    console.log('Nodo seleccionado:', event.node);
  }
}
