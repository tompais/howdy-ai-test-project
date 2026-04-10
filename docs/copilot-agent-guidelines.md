# GitHub Copilot — Guía del Agente Colaborador

> **Versión bilingüe** — Este documento está en español como referencia para el equipo.
> El archivo operativo primario (leído automáticamente por Copilot) es `.github/copilot-instructions.md`.

---

## ¿Qué es este documento?

Este archivo define el **perfil operativo de GitHub Copilot** como agente colaborador secundario dentro del proyecto `howdy-ai-test-project`. Es el equivalente del `CLAUDE.md` pero orientado al rol de Copilot: ejecución, implementación, automatización y gestión de repositorio.

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

## Contexto del Proyecto

**howdy-ai-test-project** — Proyecto Node.js con módulos CommonJS (`"type": "commonjs"`).

### Comandos principales

```bash
npm install       # instalar dependencias
npm run lint      # ejecutar ESLint
npm test          # ejecutar tests (Jest)
```

### CI/CD

Pipeline en `.github/workflows/ci.yml`:
1. Checkout del código
2. Setup Node.js (LTS)
3. `npm ci` — instalación limpia
4. `npm run lint` — análisis estático
5. `npm test` — suite de tests con Jest
6. Upload de cobertura (artefacto)

---

## Arquitectura por Capas

**Controller → Service → Domain → Repository**

| Capa | Responsabilidad | Puede importar de |
|------|----------------|-------------------|
| Controller | Routing, validación de entrada, mapeo de respuesta HTTP | Service |
| Service | Orquestación de casos de uso, lógica de aplicación | Domain, Repository |
| Domain | Entidades y reglas de negocio puras | (ninguna capa superior) |
| Repository | Acceso a datos (DB, APIs externas) | Domain |

### Reglas de oro

- **Controladores delgados**: nunca lógica de negocio dentro de un controller.
- **Inyección de dependencias por constructor**: nunca usar `new Dependency()` dentro del cuerpo de una clase.
- **Sin importaciones inversas**: una capa inferior no puede importar de una capa superior.
- **Domain libre de frameworks**: las entidades y reglas de negocio no dependen de Express, ORM, ni ningún framework.

---

## Principios de Ingeniería

### SOLID
- **S**ingle Responsibility — cada clase tiene una sola razón de cambio.
- **O**pen/Closed — extender por composición, no modificación.
- **L**iskov Substitution — las implementaciones respetan el contrato de sus interfaces.
- **I**nterface Segregation — interfaces pequeñas y focalizadas.
- **D**ependency Inversion — depender de abstracciones, no de concreciones.

### Clean Code
- Funciones pequeñas y con nombre descriptivo.
- Sin condicionales largos — aplicar patrones de diseño (Strategy, Guard Clauses).
- Constantes en lugar de strings literales; enums para conjuntos de valores finitos.
- Código legible y declarativo sobre código conciso y críptico.

### YAGNI / KISS / DRY
- No agregar funcionalidad que no se necesita ahora.
- La solución más simple que funcione correctamente es la correcta.
- Evitar duplicación; extraer abstracciones reutilizables cuando tiene sentido.

---

## Validación y Manejo de Errores

### Validación
- Toda validación de entrada ocurre en el **controller**.
- Retornar códigos HTTP semánticamente correctos:
  - `400 Bad Request` — input inválido
  - `401 Unauthorized` — no autenticado
  - `403 Forbidden` — sin permisos
  - `404 Not Found` — recurso no existe
  - `409 Conflict` — estado inconsistente
  - `500 Internal Server Error` — error inesperado

### Excepciones
- Usar **excepciones nombradas** (`UserNotFoundException`, `OrderAlreadyExistsError`).
- Las excepciones deben ser autocontenidas: mensaje claro, parámetros mínimos.
- **Global error handler**: respuestas claras, sin stack traces ni info sensible expuesta.
- Nunca silenciar errores (`catch` vacío) — loguear o re-lanzar.

---

## Flujo de Trabajo Git

### Nomenclatura de ramas

| Prefijo | Uso |
|---------|-----|
| `feature/*` | Nueva funcionalidad |
| `fix/*` | Corrección de bugs |
| `refactor/*` | Reestructuración sin cambio de comportamiento |
| `chore/*` | Tooling, dependencias, CI/CD |
| `hotfix/*` | Fixes urgentes en producción |
| `wording/*` | Cambios en documentación o copy |

**Nunca** commitear directamente a `main`.

### Commits

- Atómicos y descriptivos — un cambio lógico por commit.
- Modo imperativo: `Add user validation`, no `Added user validation`.

### Pull Requests

**Prefijos de título obligatorios**:

| Prefijo | Tipo |
|---------|------|
| `[FTR]` | Feature nueva |
| `[FIX]` | Bug fix |
| `[RFT]` | Refactor |
| `[CHR]` | Chore |
| `[WRD]` | Wording / documentación |

**Descripción de PR debe incluir**:
1. ¿Qué se hizo?
2. ¿Por qué se hizo?
3. Decisiones clave tomadas.

Encadenar PRs cuando hay dependencia. Sugerir labels de GitHub cuando aplique.

---

## Responsabilidades de CI/CD

Copilot es el agente principal para el trabajo de pipelines:

- Mantener `.github/workflows/ci.yml`.
- Nuevos jobs siguen el patrón: checkout → setup-node → `npm ci` → paso específico.
- Versiones de actions ancladas a major estable (`@v4`).
- Secrets siempre vía `${{ secrets.NOMBRE }}` — nunca hardcodeados.

---

## Responsabilidades de Documentación

- Actualizar `README.md` al agregar features o cambiar estructura del proyecto.
- Mantener `/docs` sincronizado con cambios de código.
- Mantener `/diagrams` (Mermaid `.mmd`) actualizado con cambios de arquitectura.
- Generar/actualizar specs OpenAPI/Swagger al modificar endpoints de API.

---

## Integración con Sourcery AI

Cuando aparecen sugerencias de Sourcery en PRs:

- **Aceptar** refactors que mejoren legibilidad sin cambiar comportamiento.
- **Rechazar** sugerencias que violen capas o introduzcan complejidad innecesaria.
- Abrir issues de seguimiento para refactors válidos pero fuera de alcance.

---

## Mejora Continua

- Al finalizar trabajo significativo, evaluar si se debe crear un nuevo skill en `.claude/skills/` o un nuevo agente en `.claude/agents/`.
- Identificar patrones repetidos como candidatos a utilidades compartidas.
- Señalar proactivamente deuda técnica introducida durante la implementación.

---

## Checklist por PR

```markdown
- [ ] Código en la capa arquitectónica correcta
- [ ] Sin lógica de negocio en controllers
- [ ] Dependencias inyectadas por constructor
- [ ] Excepción nombrada usada (si aplica)
- [ ] Códigos HTTP semánticamente correctos
- [ ] Sin secrets ni magic strings hardcodeados
- [ ] /docs y /diagrams actualizados (si cambió la estructura)
- [ ] Spec OpenAPI actualizado (si cambió la superficie de API)
- [ ] README.md actualizado (si cambió la estructura o comandos)
- [ ] CI pipeline pasa (lint + tests)
- [ ] Título del PR con prefijo correcto ([FTR], [FIX], etc.)
- [ ] Descripción del PR incluye qué + por qué + decisiones
```

---

## Relación con otros archivos de configuración

| Archivo | Propósito |
|---------|-----------|
| `CLAUDE.md` | Instrucciones primarias para Claude (fuente de verdad compartida) |
| `.github/copilot-instructions.md` | Instrucciones operativas para Copilot (leído automáticamente) |
| `docs/copilot-agent-guidelines.md` | Este archivo — referencia extendida en español |
| `.claude/agents/architecture-reviewer.md` | Agente Claude para revisión de arquitectura |
| `.claude/skills/project-conventions/SKILL.md` | Skill Claude con convenciones del proyecto |
| `.claude/skills/new-feature/SKILL.md` | Skill Claude para flujo de nueva feature |
