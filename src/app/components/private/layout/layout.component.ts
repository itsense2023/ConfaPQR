import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { SessionStorageItems } from '../../../enums/session-storage-items.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  nodes!: TreeNode[];

  constructor(private router: Router) {}

  ngOnInit() {
    const arrayAlmacenado = sessionStorage.getItem(SessionStorageItems.MENU);
    console.log(arrayAlmacenado?.replaceAll('_', '-'));
    this.nodes = arrayAlmacenado ? JSON.parse(arrayAlmacenado.replaceAll('_', '-')) : [];
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

  logout(): void {
    // Eliminar información de autenticación (por ejemplo, token)
    this.clearAuthenticationData();

    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  // Método para limpiar la información de autenticación
  private clearAuthenticationData(): void {
    // Eliminar token u otra información de autenticación del almacenamiento local
    sessionStorage.clear();
  }
}
