import { Component, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-politica-privacidade',
  standalone: true,
  templateUrl: './politica-privacidade.component.html',
  styleUrl: './politica-privacidade.component.scss',
})
export class PoliticaPrivacidadeComponent implements AfterViewInit {
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  sections = [
    { id: 'dados', label: '01 · Dados coletados' },
    { id: 'coleta', label: '02 · Como coletamos' },
    { id: 'consentimento', label: '03 · Consentimento' },
    { id: 'direitos', label: '04 · Seus direitos' },
    { id: 'exercicio', label: '05 · Exercício dos direitos' },
    { id: 'armazenamento', label: '06 · Armazenamento' },
    { id: 'seguranca', label: '07 · Segurança' },
    { id: 'compartilhamento', label: '08 · Compartilhamento' },
    { id: 'cookies', label: '09 · Cookies' },
    { id: 'alteracoes', label: '10 · Alterações' },
    { id: 'responsabilidade', label: '11 · Responsabilidade' },
    { id: 'encarregado', label: '12 · Encarregado' },
  ];

  activeId = 'dados';

  ngAfterViewInit() {
    this.updateActive();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateActive();
  }

  private updateActive() {
    const offset = 140; // altura do header + folga
    let current = this.sections[0].id;

    for (const s of this.sections) {
      const el = document.getElementById(s.id);
      if (el && el.getBoundingClientRect().top - offset <= 0) {
        current = s.id;
      }
    }

    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) current = this.sections[this.sections.length - 1].id;

    this.activeId = current;
  }

  goTo(event: Event, id: string) {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - 95;
    window.scrollTo({ top, behavior: 'smooth' });
    this.activeId = id;
  }
}
