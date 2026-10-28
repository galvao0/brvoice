import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type Field = 'nome' | 'empresa' | 'email' | 'tel' | 'ok';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  scrolled = false;
  mobileMenuOpen = false;

  whatsappUrl =
    'https://wa.me/558132442016?text=' +
    encodeURIComponent('Olá! Gostaria de falar com um especialista da BR Voice.');

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 30;

    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 900 && this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  menu: { label: string; href?: string; route?: string }[] = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Produtos e Serviços', href: '#produtos' },
    { label: 'Parceiros', href: '#parceiros' },
    { label: 'Soluções para Empresas', href: '#setores' },
    { label: 'Contato', href: '#contato' },
    { label: 'Trabalhe conosco', route: '/trabalhe-conosco' },
  ];

  products = [
    {
      n: 'Segurança Eletrônica',
      d: 'Videomonitoramento, controle de acesso e alarmes.',
      i: 'M3 8l9-5 9 5v8l-9 5-9-5z M12 8v5',
    },
    {
      n: 'Facilities',
      d: 'Gestão predial e operação integrada de ambientes.',
      i: 'M4 20V8l8-4 8 4v12 M9 20v-6h6v6',
    },
    {
      n: 'Cidades Inteligentes',
      d: 'Sensores, dados e conectividade para o espaço urbano.',
      i: 'M3 20h18 M6 20V10h4v10 M14 20V4h4v16',
    },
    {
      n: 'Comunicação Unificada',
      d: 'Voz, vídeo e mensagens em uma só plataforma.',
      i: 'M4 5h16v11H9l-5 4z',
    },
    {
      n: 'Infraestrutura de Redes',
      d: 'Cabeamento, Wi-Fi e segurança de rede.',
      i: 'M12 3a9 9 0 100 18 9 9 0 000-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18',
    },
  ];

  ai = [
    'Detecção facial',
    'Reconhecimento facial',
    'Autotracking',
    'Leitura de placas e inteligência artificial',
  ];

  sectors = [
    {
      n: 'Energia',
      d: 'Segurança conforme a resolução 864 da ANEEL.',
    },
    {
      n: 'Educação',
      d: 'Campi monitorados e conectados.',
    },
    {
      n: 'Indústria',
      d: 'Proteção de plantas e processos.',
    },
    {
      n: 'Saúde',
      d: 'Proteção de plantas e processos.',
    },
    {
      n: 'Varejo',
      d: 'Proteção de plantas e processos.',
    },
  ];

  clients = [
    { n: 'Iegaranhuns', logo: 'assets/clients/iegaranhuns.png' },
    { n: 'ASSU', logo: 'assets/clients/assu.png' },
    { n: 'Chesf', logo: 'assets/clients/chesf.png' },
    { n: 'BASF', logo: 'assets/clients/basf.png' },
    { n: 'FPS', logo: 'assets/clients/fps.png' },
    { n: 'Benteler', logo: 'assets/clients/benteler.png' },
    { n: 'Shineray', logo: 'assets/clients/shineray.png' },
    { n: 'Enaex', logo: 'assets/clients/enaex.png' },
    { n: 'Copergás', logo: 'assets/clients/copergas.png' },
    { n: 'HMAR', logo: 'assets/clients/hmar.png' },
    { n: 'SiDi', logo: 'assets/clients/sidi.png' },
  ];

  partners = [
    { n: 'Intelbras', logo: '/assets/partners/intelbras.png' },
    { n: 'Digifort', logo: 'assets/partners/digifort.png' },
    { n: 'Hikvision', logo: 'assets/partners/hikvision.png' },
    { n: 'Huawei', logo: 'assets/partners/huawei.png' },
    { n: 'Digivox', logo: 'assets/partners/digivox.png' },
    { n: 'Juganu', logo: 'assets/partners/juganu.png' },
    { n: 'Digitro', logo: 'assets/partners/digitro.png' },
    { n: 'Dell', logo: 'assets/partners/dell.png' },
    { n: 'HP', logo: 'assets/partners/hp.png' },
    { n: 'Furukawa', logo: 'assets/partners/furukawa.png' },
    { n: 'Fortinet', logo: 'assets/partners/fortinet.png' },
    { n: 'Unify', logo: 'assets/partners/unify.png' },
  ];

  f = {
    nome: '',
    empresa: '',
    email: '',
    tel: '',
    ok: false,
  };

  touched: Record<Field, boolean> = {
    nome: false,
    empresa: false,
    email: false,
    tel: false,
    ok: false,
  };

  submitted = false;
  sent = false;

  touch(field: Field): void {
    this.touched[field] = true;
  }

  onTel(event: Event): void {
    const input = event.target as HTMLInputElement;
    const d = input.value.replace(/\D/g, '').slice(0, 11);

    let formatted = d;
    if (d.length > 10) {
      formatted = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    } else if (d.length > 6) {
      formatted = `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    } else if (d.length > 2) {
      formatted = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    } else if (d.length > 0) {
      formatted = `(${d}`;
    }

    input.value = formatted;
    this.f.tel = formatted;
  }

  validate(field: Field): string {
    switch (field) {
      case 'nome': {
        const v = this.f.nome.trim();
        if (!v) return 'Informe seu nome completo.';
        if (v.length < 5 || v.split(/\s+/).length < 2) return 'Informe nome e sobrenome.';
        return '';
      }
      case 'empresa': {
        const v = this.f.empresa.trim();
        if (!v) return 'Informe o nome da empresa.';
        if (v.length < 2) return 'Nome da empresa muito curto.';
        return '';
      }
      case 'email': {
        const v = this.f.email.trim();
        if (!v) return 'Informe seu e-mail corporativo.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Informe um e-mail válido.';
        return '';
      }
      case 'tel': {
        const d = this.f.tel.replace(/\D/g, '');
        if (!d) return 'Informe seu telefone.';
        if (d.length < 10 || d.length > 11) return 'Informe DDD e número completos.';
        if (Number(d.slice(0, 2)) < 11) return 'DDD inválido.';
        if (d.length === 11 && d[2] !== '9') return 'Celular deve começar com 9.';
        return '';
      }
      case 'ok':
        return this.f.ok ? '' : 'Aceite a política de privacidade para continuar.';
    }
  }

  getError(field: Field): string {
    return this.touched[field] || this.submitted ? this.validate(field) : '';
  }

  get formValid(): boolean {
    return (['nome', 'empresa', 'email', 'tel', 'ok'] as Field[]).every((k) => !this.validate(k));
  }

  enviar(): void {
    this.submitted = true;

    if (!this.formValid) return;

    this.f.nome = this.f.nome.trim();
    this.f.empresa = this.f.empresa.trim();
    this.f.email = this.f.email.trim().toLowerCase();

    this.sent = true;
  }

  novaMensagem(): void {
    this.f = { nome: '', empresa: '', email: '', tel: '', ok: false };
    this.touched = { nome: false, empresa: false, email: false, tel: false, ok: false };
    this.submitted = false;
    this.sent = false;
  }
}
