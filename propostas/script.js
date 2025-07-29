// Configuração do Tailwind CSS
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'aldi-orange': '#f37021',
                'aldi-terracotta': '#d1603d',
                'aldi-salmon': '#f7a98f',
                'aldi-white': '#ffffff',
                'aldi-gray': '#f8f9fa',
                'aldi-dark': '#2d3748'
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
   
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.getElementById(tab.dataset.target);

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(content => content.classList.add('hidden'));
            target.classList.remove('hidden');
        });
    });

    const phases = document.querySelectorAll('.phase');
    const phaseDetailsContainer = document.getElementById('phase-details');
    const phaseDetailsContent = {
        phase1: `
            <h4 class="font-bold text-xl mb-4 text-aldi-dark">Planejamento e Escopo</h4>
            <p class="text-gray-700 leading-relaxed">Nesta fase inicial, definimos o período da auditoria, garantimos o acesso aos sistemas e documentos necessários, e realizamos uma reunião de alinhamento com a equipe do hospital para detalhar o cronograma e as expectativas.</p>
        `,
        phase2: `
            <h4 class="font-bold text-xl mb-4 text-aldi-dark">Execução Detalhada</h4>
            <p class="text-gray-700 leading-relaxed">Realizamos a análise minuciosa dos dados no RM TOTVS, revisamos contratos e documentos, cruzamos informações entre módulos e fontes externas, e executamos testes e simulações para validar as regras de cálculo.</p>
        `,
        phase3: `
            <h4 class="font-bold text-xl mb-4 text-aldi-dark">Identificação e Recomendações</h4>
            <p class="text-gray-700 leading-relaxed">Todas as não conformidades são registradas com evidências e impacto. Para cada uma, propomos soluções claras e práticas, incluindo ajustes no sistema, revisão de processos e treinamentos.</p>
        `,
        phase4: `
            <h4 class="font-bold text-xl mb-4 text-aldi-dark">Relatório Final e Apresentação</h4>
            <p class="text-gray-700 leading-relaxed">Consolidamos todas as descobertas em um relatório detalhado e objetivo. Apresentamos os resultados à diretoria e equipes envolvidas, facilitando a discussão e validação das ações corretivas.</p>
        `
    };
    
    phases.forEach(phase => {
        phase.addEventListener('click', () => {
            const phaseKey = phase.dataset.phase;

            phases.forEach(p => p.classList.remove('active'));
            phase.classList.add('active');

            phaseDetailsContainer.innerHTML = phaseDetailsContent[phaseKey];
        });
    });
    
    if(phases.length > 0){
        phases[0].click();
    }

    const ctx = document.getElementById('riskComplianceChart').getContext('2d');
    let isAfterState = false;

    const beforeAuditData = {
        labels: ['Riscos (Financeiros, Legais)', 'Nível de Conformidade'],
        datasets: [{
            label: 'Antes da Auditoria',
            data: [65, 35],
            backgroundColor: ['#f87171', '#d1d5db'],
            borderColor: '#ffffff',
            borderWidth: 4,
            hoverOffset: 8
        }]
    };

    const afterAuditData = {
        labels: ['Riscos Mitigados', 'Nível de Conformidade'],
        datasets: [{
            label: 'Depois da Auditoria',
            data: [10, 90],
            backgroundColor: ['#f7a98f', '#f37021'],
            borderColor: '#ffffff',
            borderWidth: 4,
            hoverOffset: 8
        }]
    };

    const chartConfig = {
        type: 'doughnut',
        data: beforeAuditData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 25,
                        font: {
                            size: 14,
                            family: 'Inter'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed + '%';
                            }
                            return label;
                        }
                    },
                    backgroundColor: 'rgba(45, 55, 72, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#f37021',
                    borderWidth: 1
                }
            },
            animation: {
                animateRotate: true,
                duration: 1000
            }
        }
    };

    const riskComplianceChart = new Chart(ctx, chartConfig);

    const toggleChartButton = document.getElementById('toggleChartState');
    toggleChartButton.addEventListener('click', () => {
        isAfterState = !isAfterState;
        if (isAfterState) {
            riskComplianceChart.data = afterAuditData;
            toggleChartButton.textContent = 'Ver Estado Pré-Auditoria ←';
        } else {
            riskComplianceChart.data = beforeAuditData;
            toggleChartButton.textContent = 'Ver Estado Pós-Auditoria →';
        }
        riskComplianceChart.update('active');
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

