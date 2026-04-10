# GitHub Copilot — Guía del Agente Colaborador

> **Versión bilingüe** — Este documento está en español como orientación para el equipo.
> El archivo operativo primario (leído automáticamente por Copilot) es `.github/copilot-instructions.md`.

---

## ¿Qué es este documento?

Este archivo es una orientación en español para entender el rol de **GitHub Copilot** como agente colaborador secundario en `howdy-ai-test-project`.

**Fuentes de verdad — no repetidas aquí**:
- **Convenciones técnicas compartidas** → [`CLAUDE.md`](../CLAUDE.md) — arquitectura, principios de ingeniería, validación, errores, flujo Git, documentación.
- **Instrucciones operativas de Copilot** → [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) — rol de Copilot, guías de generación de código, CI/CD, Sourcery, checklist por PR.

Este documento **no duplica** esas reglas; las referencia y explica el modelo de colaboración.

---

## Modelo de Colaboración Multi-Agente

```
┌─────────────────────────────────────────────────────────┐
│                    FLUJO DE TRABAJO                     │
│                                                         │
│  Claude (Primario)          GitHub Copilot (Secundario) │
│  ─────────────────          ────────────────────────── │
│  • Arquitectura             • Generación de código      │
│  • Diseño de sistema        • Boilerplate               │
│  • Decisiones técnicas      • CI/CD pipelines           │
│  • Revisión de calidad      • .gitignore                │
│  • Documentación            • Scaffolding               │
│  • Planificación            • Implementación guiada     │
└─────────────────────────────────────────────────────────┘
```

**Principio clave**: Copilot actúa *bajo dirección arquitectónica de Claude*. Las decisiones de diseño y estructura son de Claude; la ejecución, automatización y generación de código son responsabilidad de Copilot.

---

## Tecnología del Proyecto

**JavaScript / CommonJS** (`"type": "commonjs"` en `package.json`). El proyecto **no usa TypeScript**. Para documentación de tipos, usar anotaciones JSDoc cuando sea útil.

```bash
npm install       # instalar dependencias
npm run lint      # ejecutar ESLint
npm test          # ejecutar tests (Jest)
```

---

## Convenciones Técnicas

Todas las reglas de arquitectura (Controller → Service → Domain → Repository), principios de ingeniería (SOLID, DRY, KISS, YAGNI), validación, manejo de errores, flujo Git y responsabilidades de documentación están definidas en [`CLAUDE.md`](../CLAUDE.md) y aplican a **ambos agentes**.

Las responsabilidades específicas de Copilot (CI/CD, generación de código, integración con Sourcery, checklist por PR) están en [`.github/copilot-instructions.md`](../.github/copilot-instructions.md).

---

## Mapa de Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `CLAUDE.md` | Fuente de verdad para todas las convenciones compartidas (Claude + Copilot) |
| `.github/copilot-instructions.md` | Instrucciones operativas para Copilot (leído automáticamente por GitHub Copilot) |
| `docs/copilot-agent-guidelines.md` | Este archivo — orientación en español para el equipo |
| `.claude/agents/architecture-reviewer.md` | Agente Claude para revisión de arquitectura |
| `.claude/skills/project-conventions/SKILL.md` | Skill Claude con convenciones del proyecto |
| `.claude/skills/new-feature/SKILL.md` | Skill Claude para flujo de nueva feature |
