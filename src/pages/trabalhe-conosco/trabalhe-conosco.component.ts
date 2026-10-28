import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type Field = 'nome' | 'email' | 'tel' | 'resumo' | 'cv' | 'ok';

@Component({
  selector: 'app-trabalhe-conosco',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './trabalhe-conosco.component.html',
  styleUrl: './trabalhe-conosco.component.scss',
})
export class TrabalheConoscoComponent {
  readonly maxSize = 5 * 1024 * 1024;
  readonly allowed = ['pdf', 'doc', 'docx'];

  f = {
    nome: '',
    email: '',
    tel: '',
    resumo: '',
    ok: false,
  };

  cv: File | null = null;

  touched: Record<Field, boolean> = {
    nome: false,
    email: false,
    tel: false,
    resumo: false,
    cv: false,
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

  onFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cv = input.files && input.files.length ? input.files[0] : null;
    this.touched.cv = true;
  }

  removeFile(input: HTMLInputElement): void {
    input.value = '';
    this.cv = null;
    this.touched.cv = true;
  }

  formatSize(bytes: number): string {
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  validate(field: Field): string {
    switch (field) {
      case 'nome': {
        const v = this.f.nome.trim();
        if (!v) return 'Informe seu nome completo.';
        if (v.length < 5 || v.split(/\s+/).length < 2) return 'Informe nome e sobrenome.';
        return '';
      }
      case 'email': {
        const v = this.f.email.trim();
        if (!v) return 'Informe seu e-mail.';
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
      case 'resumo': {
        const v = this.f.resumo.trim();
        if (!v) return 'Escreva um breve resumo sobre você.';
        if (v.length < 20) return 'Escreva pelo menos 20 caracteres.';
        return '';
      }
      case 'cv': {
        if (!this.cv) return 'Anexe seu currículo.';
        const ext = this.cv.name.split('.').pop()?.toLowerCase() ?? '';
        if (!this.allowed.includes(ext)) return 'Envie um arquivo PDF, DOC ou DOCX.';
        if (this.cv.size > this.maxSize) return 'O arquivo deve ter no máximo 5 MB.';
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
    return (['nome', 'email', 'tel', 'resumo', 'cv', 'ok'] as Field[]).every(
      (k) => !this.validate(k),
    );
  }

  enviar(): void {
    this.submitted = true;

    if (!this.formValid || !this.cv) return;

    const data = new FormData();
    data.append('nome', this.f.nome.trim());
    data.append('email', this.f.email.trim().toLowerCase());
    data.append('telefone', this.f.tel);
    data.append('resumo', this.f.resumo.trim());
    data.append('curriculo', this.cv, this.cv.name);

    this.sent = true;
  }

  novoEnvio(): void {
    this.f = { nome: '', email: '', tel: '', resumo: '', ok: false };
    this.cv = null;
    this.touched = { nome: false, email: false, tel: false, resumo: false, cv: false, ok: false };
    this.submitted = false;
    this.sent = false;
  }
}
