import { Component } from '@angular/core';

@Component({
  selector: 'app-rafael-ramalho',
  standalone: true,
  imports: [],
  templateUrl: './rafaelRamalho.component.html',
  styleUrl: './rafaelRamalho.component.scss'
})
export class RafaelRamalhoComponent {

  contact = {
    nome: 'Rafael Ramalho',
    telefone: '+5531989093846',
    email: 'rafael.ramalho@aldiweb.com.br',
    website: 'https://www.aldiweb.com.br',
    linkedIn: 'https://www.linkedin.com/in/raffaelramalhorosa/',
    org: 'Rafael Ramalho'
  };

  shareData = {
    title: 'Rafael Ramalho - CONSULTOR AldiWeb',
    text: 'Conheça o perfil do Rafael Ramalho!',
    url: window.location.href 
  };

  saveContact(): void {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${this.contact.nome}
ORG:${this.contact.org}
TEL;TYPE=WORK,VOICE:${this.contact.telefone}
EMAIL:${this.contact.email}
URL:${this.contact.website}
URL;TYPE=LinkedIn:${this.contact.linkedIn}
NOTE:ALDI WEB
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    // Sanitize filename
    const filename = `${this.contact.nome.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.vcf`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  async shareLink(): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share(this.shareData);
        console.log('Link compartilhado com sucesso!');
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      console.log('Web Share API não suportada. Link para compartilhar:', this.shareData.url);
      // Consider implementing a copy-to-clipboard fallback here
      alert('A API de compartilhamento não é suportada neste navegador. Você pode copiar o link manualmente.');
    }
  }
}
