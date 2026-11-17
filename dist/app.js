(() => {
  'use strict';

  const familyInfo = {
    linear: {
      label: 'Lineal', description: 'Una recta: la pendiente representa una tasa de cambio constante.', intro: 'f(x) = m(x − h) + k: la pendiente m indica cuánto cambia y por cada unidad de x.', coefficient: 'pendiente', hLabel: 'punto de referencia x', kLabel: 'valor en ese punto', coefficientHelp: 'La pendiente indica el cambio vertical por cada unidad horizontal.', hHelp: 'Este punto de referencia pertenece a la recta.', kHelp: 'Valor de la función cuando x = h.', featureName: 'Punto de referencia', graphTitle: 'Una tasa de cambio constante', title: 'Controla la recta'
    },
    quadratic: {
      label: 'Cuadrática', description: 'Una parábola: el exponente 2 crea simetría alrededor del vértice.', intro: 'f(x) = a(x − h)² + k: el vértice está en (h, k) y a controla apertura y orientación.', coefficient: 'apertura', hLabel: 'desplazamiento horizontal', kLabel: 'desplazamiento vertical', coefficientHelp: 'Signo: orientación · tamaño: apertura.', hHelp: 'Mueve el vértice a izquierda o derecha.', kHelp: 'Mueve el vértice arriba o abajo.', featureName: 'Vértice', graphTitle: 'La parábola toma forma', title: 'Controla la parábola'
    },
    absolute: {
      label: 'Valor absoluto', description: 'Una V: dos tramos rectos se encuentran en el vértice.', intro: 'f(x) = a|x − h| + k: el vértice es (h, k) y el signo de a orienta la V.', coefficient: 'inclinación', hLabel: 'desplazamiento horizontal', kLabel: 'desplazamiento vertical', coefficientHelp: 'El signo orienta la V; el tamaño hace sus lados más inclinados.', hHelp: 'Desplaza el vértice horizontalmente.', kHelp: 'Desplaza el vértice verticalmente.', featureName: 'Vértice', graphTitle: 'Una V formada por dos tramos', title: 'Controla la V'
    },
    cubic: {
      label: 'Cúbica', description: 'Una curva en S: el punto de inflexión marca dónde cambia su concavidad.', intro: 'f(x) = a(x − h)³ + k: el punto de inflexión está en (h, k).', coefficient: 'escala', hLabel: 'posición horizontal', kLabel: 'posición vertical', coefficientHelp: 'El signo cambia la orientación; el tamaño cambia la escala vertical.', hHelp: 'Desplaza el punto de inflexión horizontalmente.', kHelp: 'Desplaza el punto de inflexión verticalmente.', featureName: 'Inflexión', graphTitle: 'La curva cúbica cambia de concavidad', title: 'Controla la cúbica'
    },
    exponential: {
      label: 'Exponencial', description: 'Una curva de crecimiento o decrecimiento con asíntota horizontal.', intro: 'f(x) = a·2^(x − h) + k: cada paso en x duplica o reduce a la mitad la parte variable.', coefficient: 'escala', hLabel: 'desplazamiento horizontal', kLabel: 'asíntota horizontal', coefficientHelp: 'El signo determina si la curva queda arriba o debajo de la asíntota.', hHelp: 'Desplaza la curva horizontalmente.', kHelp: 'La curva se acerca a y = k, sin tocarla.', featureName: 'Asíntota horizontal', graphTitle: 'Crecimiento exponencial', title: 'Controla la exponencial'
    },
    logarithmic: {
      label: 'Logarítmica', description: 'La inversa de una exponencial: tiene dominio restringido y asíntota vertical.', intro: 'f(x) = a·log₂(x − h) + k: solo existe cuando x > h y se acerca a la asíntota x = h.', coefficient: 'escala', hLabel: 'asíntota vertical x', kLabel: 'desplazamiento vertical', coefficientHelp: 'El signo cambia el sentido; el tamaño escala el crecimiento lento.', hHelp: 'Mueve la frontera del dominio y la asíntota vertical.', kHelp: 'Desplaza la curva hacia arriba o abajo.', featureName: 'Asíntota vertical', graphTitle: 'La curva logarítmica crece lentamente', title: 'Controla la logarítmica'
    }
  };

  const examplesByFamily = {
    linear: [{ id: 'linear-rise', name: 'Recta ascendente', a: 1, h: -1, k: 0 }, { id: 'linear-steep', name: 'Pendiente negativa', a: -2, h: 1, k: 2 }],
    quadratic: [{ id: 'quad-base', name: 'Raíces claras', a: 1, h: 2, k: -1 }, { id: 'quad-inverted', name: 'Abre hacia abajo', a: -1, h: 2, k: 3 }, { id: 'quad-steep', name: 'Más estrecha', a: 2, h: 2, k: -2 }],
    absolute: [{ id: 'abs-v', name: 'V hacia arriba', a: 1, h: 0, k: -2 }, { id: 'abs-inverted', name: 'V invertida', a: -1, h: 1, k: 3 }],
    cubic: [{ id: 'cubic-s', name: 'Curva en S', a: 1, h: 0, k: 0 }, { id: 'cubic-reverse', name: 'S invertida', a: -0.5, h: -1, k: 1 }],
    exponential: [{ id: 'exp-growth', name: 'Crecimiento', a: 1, h: 0, k: 0 }, { id: 'exp-decay', name: 'Decrecimiento', a: -1, h: 0, k: 4 }],
    logarithmic: [{ id: 'log-growth', name: 'Logaritmo base', a: 1, h: 0, k: 0 }, { id: 'log-shifted', name: 'Asíntota desplazada', a: 1, h: 1, k: -1 }, { id: 'log-inverted', name: 'Decrecimiento logarítmico', a: -1, h: -1, k: 2 }]
  };

  const state = {
    family: 'quadratic', a: 1, h: 2, k: -1, selectedExample: 'quad-base', selectedX: null, showKeyPoints: true, hover: null,
    challengesVersion: 0, name: 'Raíces claras', view: { mode: 'compare', xCenter: 2, yCenter: -1, xSpan: 12, ySpan: 12 }, drag: null
  };

  const canvas = document.getElementById('graph-canvas');
  const ctx = canvas.getContext('2d');
  const elements = {
    canonical: document.getElementById('canonical-formula'), standard: document.getElementById('standard-formula'), factored: document.getElementById('factored-formula'),
    canonicalDescription: document.getElementById('canonical-description'), standardDescription: document.getElementById('standard-description'), factoredDescription: document.getElementById('factored-description'),
    canonicalClue: document.getElementById('canonical-clue'), standardClue: document.getElementById('standard-clue'), factoredClue: document.getElementById('factored-clue'),
    formLabel1: document.getElementById('form-label-1'), formLabel2: document.getElementById('form-label-2'), formLabel3: document.getElementById('form-label-3'), functionName: document.getElementById('function-name'),
    graphTitle: document.getElementById('graph-title'), graphCallout: document.getElementById('graph-callout'), canvasNote: document.getElementById('canvas-note'), table: document.getElementById('value-table'), selectedPoint: document.getElementById('selected-point'),
    challengeGrid: document.getElementById('challenge-grid'), challengeIntro: document.getElementById('challenge-intro'), exampleButtons: document.getElementById('example-buttons'), familyDescription: document.getElementById('family-description'), representationIntro: document.getElementById('representation-intro'), controlIntro: document.getElementById('control-intro'), controlsTitle: document.getElementById('controls-title'),
    a: document.getElementById('a-slider'), h: document.getElementById('h-slider'), k: document.getElementById('k-slider'), aSymbol: document.getElementById('a-symbol'), aLabel: document.getElementById('a-label'), hLabel: document.getElementById('h-label'), kLabel: document.getElementById('k-label'), aHelp: document.getElementById('a-help'), hHelp: document.getElementById('h-help'), kHelp: document.getElementById('k-help'), aValue: document.getElementById('a-value'), hValue: document.getElementById('h-value'), kValue: document.getElementById('k-value'), keypoints: document.getElementById('keypoints-toggle'), legend: document.getElementById('key-legend'), viewStatus: document.getElementById('view-status'), practiceFamily: document.getElementById('practice-family-label'), practicePrompt: document.getElementById('practice-prompt'), practiceX: document.getElementById('practice-x'), practiceResult: document.getElementById('practice-result')
  };

  const nearZero = value => Math.abs(value) < 1e-9 ? 0 : value;
  const fixed = (value, digits = 2) => {
    if (!Number.isFinite(value)) return 'indefinido';
    const rounded = Math.round(nearZero(value) * (10 ** digits)) / (10 ** digits);
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '').replace('.', ',');
  };
  const signed = (value, digits = 2) => value < 0 ? `− ${fixed(Math.abs(value), digits)}` : `+ ${fixed(value, digits)}`;
  const signedTail = value => nearZero(value) === 0 ? '' : ` ${signed(value)}`;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const formatPair = (x, y) => `(${fixed(x)}, ${fixed(y)})`;
  const coeffText = (value, digits = 2) => Math.abs(Math.abs(value) - 1) < 1e-9 ? '' : fixed(Math.abs(value), digits);
  const rootRelation = value => Math.abs(value - Math.round(value * 100) / 100) < 1e-8 ? '=' : '≈';
  const formatRoot = value => `x ${rootRelation(value)} ${fixed(value)}`;
  const innerText = () => state.h === 0 ? 'x' : state.h > 0 ? `x − ${fixed(state.h)}` : `x + ${fixed(Math.abs(state.h))}`;
  const leadText = () => Math.abs(state.a - 1) < 1e-9 ? '' : Math.abs(state.a + 1) < 1e-9 ? '−' : fixed(state.a);

  function validX(x) { return state.family !== 'logarithmic' || x > state.h + 1e-8; }
  function evaluate(x) {
    const { a, h, k, family } = state;
    if (family === 'logarithmic' && !validX(x)) return NaN;
    if (family === 'linear') return nearZero(a * (x - h) + k);
    if (family === 'quadratic') return nearZero(a * (x - h) ** 2 + k);
    if (family === 'absolute') return nearZero(a * Math.abs(x - h) + k);
    if (family === 'cubic') return nearZero(a * (x - h) ** 3 + k);
    if (family === 'exponential') return nearZero(a * (2 ** (x - h)) + k);
    return nearZero(a * Math.log2(x - h) + k);
  }

  function roots() {
    const { a, h, k, family } = state;
    if (family === 'linear') return [nearZero(h - k / a)];
    if (family === 'quadratic') { const distanceSquared = -k / a; if (distanceSquared < -1e-9) return []; const d = Math.sqrt(Math.max(0, distanceSquared)); return d < 1e-8 ? [nearZero(h)] : [nearZero(h - d), nearZero(h + d)]; }
    if (family === 'absolute') { const distance = -k / a; if (distance < -1e-9) return []; const d = Math.max(0, distance); return d < 1e-8 ? [nearZero(h)] : [nearZero(h - d), nearZero(h + d)]; }
    if (family === 'cubic') return [nearZero(h + Math.cbrt(-k / a))];
    if (family === 'exponential') { const target = -k / a; return target > 0 ? [nearZero(h + Math.log2(target))] : []; }
    return [nearZero(h + 2 ** (-k / a))];
  }

  function polynomial(coefs) {
    const order = coefs.length - 1; const terms = [];
    coefs.forEach((coefficient, index) => { const power = order - index; if (nearZero(coefficient) === 0) return; const first = terms.length === 0; const sign = coefficient < 0 ? '−' : '+'; const magnitude = Math.abs(coefficient); const coefficientString = power > 0 ? coeffText(magnitude, 4) : fixed(magnitude, 4); const variable = power === 0 ? '' : power === 1 ? 'x' : `x${power === 2 ? '²' : '³'}`; const body = `${coefficientString}${variable}` || '1'; terms.push(`${first ? (sign === '−' ? '−' : '') : ` ${sign} `}${body}`); });
    return terms.join('') || '0';
  }

  function expressionLinear(slope, intercept) { const slopeText = Math.abs(slope - 1) < 1e-9 ? 'x' : Math.abs(slope + 1) < 1e-9 ? '−x' : `${fixed(slope, 4)}x`; return nearZero(intercept) === 0 ? slopeText : `${slopeText} ${signed(intercept, 4)}`; }

  function formatCanonical() {
    const { family } = state; const inner = innerText(); const leading = leadText();
    if (family === 'linear') return `f(x) = ${leading}${state.h === 0 ? inner : `(${inner})`}${signedTail(state.k)}`;
    if (family === 'quadratic') return `f(x) = ${leading}${state.h === 0 ? 'x²' : `(${inner})²`}${signedTail(state.k)}`;
    if (family === 'absolute') return `f(x) = ${leading}${state.h === 0 ? '|x|' : `|${inner}|`}${signedTail(state.k)}`;
    if (family === 'cubic') return `f(x) = ${leading}${state.h === 0 ? 'x³' : `(${inner})³`}${signedTail(state.k)}`;
    if (family === 'exponential') return `f(x) = ${Math.abs(state.a - 1) < 1e-9 ? '' : Math.abs(state.a + 1) < 1e-9 ? '−' : `${fixed(state.a)}·`}2^(${inner})${signedTail(state.k)}`;
    return `f(x) = ${Math.abs(state.a - 1) < 1e-9 ? '' : Math.abs(state.a + 1) < 1e-9 ? '−' : `${fixed(state.a)}·`}log₂(${state.h === 0 ? 'x' : inner})${signedTail(state.k)}`;
  }

  function formatExpanded() {
    const { a, h, k, family } = state;
    if (family === 'linear') return `f(x) = ${polynomial([a, k - a * h])}`;
    if (family === 'quadratic') return `f(x) = ${polynomial([a, -2 * a * h, a * h * h + k])}`;
    if (family === 'absolute') return `x < ${fixed(h)}: ${expressionLinear(-a, a * h + k)}; x ≥ ${fixed(h)}: ${expressionLinear(a, k - a * h)}`;
    if (family === 'cubic') return `f(x) = ${polynomial([a, -3 * a * h, 3 * a * h * h, k - a * h ** 3])}`;
    if (family === 'exponential') { const coefficient = a / (2 ** h); return `f(x) ≈ ${Math.abs(coefficient - 1) < 1e-9 ? '' : `${fixed(coefficient, 4)}·`}2ˣ${signedTail(k)}`; }
    return `f(x) = ${Math.abs(a - 1) < 1e-9 ? '' : `${fixed(a)}·`}log₂(x ${h > 0 ? `− ${fixed(h)}` : h < 0 ? `+ ${fixed(Math.abs(h))}` : ''})${signedTail(k)}`;
  }

  function factorizedDescription() {
    const zeros = roots();
    if (!zeros.length) return { formula: 'f(x) = 0 no tiene soluciones reales', clue: 'no hay cortes con el eje x', before: 'Esta función', emphasis: 'no tiene ceros reales' };
    const zeroText = zeros.map(formatRoot).join(' y '); let formula = `f(x) = 0 → ${zeroText}`;
    if (state.family === 'quadratic') { const factor = root => nearZero(root) === 0 ? 'x' : root > 0 ? `(x − ${fixed(root)})` : `(x + ${fixed(Math.abs(root))})`; const lead = Math.abs(state.a - 1) < 1e-9 ? '' : Math.abs(state.a + 1) < 1e-9 ? '−' : `${fixed(state.a)}·`; formula = `f(x) ${zeros.every(root => rootRelation(root) === '=') ? '=' : '≈'} ${lead}${zeros.length === 1 ? `${factor(zeros[0])}²` : `${factor(zeros[0])}${factor(zeros[1])}`}`; }
    return { formula, clue: zeroText, before: 'Al resolver', emphasis: 'f(x) = 0', zeros };
  }

  function algebraCards() {
    const { a, h, k, family } = state; const zeros = roots(); const expanded = formatExpanded(); const equation = factorizedDescription();
    const cards = {
      linear: [{ label: 'FORMA PUNTO-PENDIENTE', formula: formatCanonical(), before: 'Muestra la', emphasis: 'pendiente m', clue: `m = ${fixed(a)} · punto ${formatPair(h, k)}` }, { label: 'FORMA PENDIENTE-INTERCEPTO', formula: expanded, before: 'El término independiente señala el', emphasis: 'corte con y', clue: formatPair(0, evaluate(0)) }, { label: 'ECUACIÓN LINEAL', formula: equation.formula, before: 'Su solución es el', emphasis: 'cero de la función', clue: zeros.length ? equation.clue : 'sin soluciones reales' }],
      quadratic: [{ label: 'FORMA CANÓNICA', formula: formatCanonical(), before: 'Revela el', emphasis: 'vértice', clue: `V${formatPair(h, k)}` }, { label: 'FORMA GENERAL', formula: expanded, before: 'Permite leer f(0), el', emphasis: 'intercepto con y', clue: formatPair(0, evaluate(0)) }, { label: 'FORMA FACTORIZADA', formula: equation.formula, before: 'Al resolver f(x)=0 encuentras los', emphasis: 'ceros', clue: equation.clue }],
      absolute: [{ label: 'FORMA DE VÉRTICE', formula: formatCanonical(), before: 'El vértice de la V es', emphasis: 'V(h, k)', clue: `V${formatPair(h, k)}` }, { label: 'REGLA POR TRAMOS', formula: expanded, before: 'La regla cambia en', emphasis: 'x = h', clue: fixed(h) }, { label: 'ECUACIÓN f(x) = 0', formula: equation.formula, before: 'Los cortes con x son las', emphasis: 'soluciones reales', clue: equation.clue }],
      cubic: [{ label: 'FORMA DE TRANSFORMACIÓN', formula: formatCanonical(), before: 'El punto de inflexión es', emphasis: 'I(h, k)', clue: `I${formatPair(h, k)}` }, { label: 'FORMA DESARROLLADA', formula: expanded, before: 'La expresión desarrollada permite', emphasis: 'sustituir x', clue: `f(0) = ${fixed(evaluate(0))}` }, { label: 'ECUACIÓN CÚBICA', formula: equation.formula, before: 'La solución real marca el', emphasis: 'corte con x', clue: equation.clue }],
      exponential: [{ label: 'FORMA EXPONENCIAL', formula: formatCanonical(), before: 'La base 2 describe el', emphasis: 'crecimiento o decrecimiento', clue: state.a > 0 ? 'crece sobre la asíntota' : 'se aproxima desde abajo' }, { label: 'FORMA A·2ˣ + k', formula: expanded, before: 'Al desplazarla, cambia su', emphasis: 'escala vertical', clue: `f(0) = ${fixed(evaluate(0))}` }, { label: 'ECUACIÓN EXPONENCIAL', formula: equation.formula, before: 'Su solución indica el', emphasis: 'corte con x', clue: equation.clue }],
      logarithmic: [{ label: 'FORMA LOGARÍTMICA', formula: formatCanonical(), before: 'La regla muestra el', emphasis: 'dominio x > h', clue: `asíntota x = ${fixed(h)}` }, { label: 'FORMA INVERSA', formula: `2^((y − ${fixed(k)}) / ${fixed(a)}) = x − h`, before: 'La inversa permite', emphasis: 'despejar x', clue: 'exponenciar ambos lados' }, { label: 'ECUACIÓN LOGARÍTMICA', formula: equation.formula, before: 'Su solución marca el', emphasis: 'corte con x', clue: equation.clue }]
    };
    return cards[family];
  }

  function getFeature() {
    const { a, h, k, family } = state;
    if (family === 'linear') return { kind: 'point', name: 'Punto de referencia', symbol: 'P', x: h, y: k, description: `pendiente constante m = ${fixed(a)}`, color: '#007e9e' };
    if (family === 'quadratic') return { kind: 'point', name: 'Vértice', symbol: 'V', x: h, y: k, description: a > 0 ? 'punto mínimo de la parábola' : 'punto máximo de la parábola', color: '#007e9e' };
    if (family === 'absolute') return { kind: 'point', name: 'Vértice', symbol: 'V', x: h, y: k, description: a > 0 ? 'punto mínimo de la V' : 'punto máximo de la V', color: '#007e9e' };
    if (family === 'cubic') return { kind: 'point', name: 'Inflexión', symbol: 'I', x: h, y: k, description: 'aquí cambia la concavidad de la curva', color: '#007e9e' };
    if (family === 'exponential') return { kind: 'asymptote-horizontal', name: 'Asíntota horizontal', symbol: 'y =', x: h, y: k, description: `la curva se acerca a y = ${fixed(k)}`, color: '#7662dd' };
    return { kind: 'asymptote-vertical', name: 'Asíntota vertical', symbol: 'x =', x: h, y: k, description: `la curva solo existe cuando x > ${fixed(h)}`, color: '#7662dd' };
  }

  function getTableValues() {
    if (state.family === 'logarithmic') return Array.from({ length: 7 }, (_, index) => { const x = nearZero(state.h + 0.5 + index * 0.75); return { x, y: evaluate(x) }; });
    const start = Math.round((state.h - 3) * 2) / 2;
    return Array.from({ length: 7 }, (_, index) => { const x = nearZero(start + index); return { x, y: evaluate(x) }; });
  }

  function resetView() {
    state.view = state.family === 'logarithmic' ? { mode: 'compare', xCenter: state.h + 6, yCenter: state.k, xSpan: 12, ySpan: 12 } : { mode: 'compare', xCenter: state.h, yCenter: state.k, xSpan: 12, ySpan: 12 };
  }

  function fitView() {
    const xs = state.family === 'logarithmic' ? Array.from({ length: 60 }, (_, index) => state.h + 0.15 + index * 0.18) : Array.from({ length: 101 }, (_, index) => state.h - 7 + index * 0.14);
    const ys = xs.map(evaluate).filter(Number.isFinite); const rootsList = roots();
    let xMin = Math.min(...xs, ...rootsList, state.h); let xMax = Math.max(...xs, ...rootsList, state.h + 1); let yMin = Math.min(...ys, 0, state.k); let yMax = Math.max(...ys, 0, state.k);
    if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) { yMin = -6; yMax = 6; }
    const xPad = Math.max(1, (xMax - xMin) * 0.1); const yPad = Math.max(2, (yMax - yMin) * 0.12);
    state.view = { mode: 'fit', xCenter: (xMin + xMax) / 2, yCenter: (yMin + yMax) / 2, xSpan: Math.max(6, xMax - xMin + xPad * 2), ySpan: Math.max(6, yMax - yMin + yPad * 2) };
  }

  function graphRange() {
    const v = state.view; let xMin = v.xCenter - v.xSpan / 2; let xMax = v.xCenter + v.xSpan / 2; let yMin = v.yCenter - v.ySpan / 2; let yMax = v.yCenter + v.ySpan / 2;
    if (state.family === 'logarithmic') xMin = Math.max(xMin, state.h + 0.04);
    if (xMax - xMin < 2) xMax = xMin + 2;
    return { xMin, xMax, yMin, yMax };
  }

  function canvasMetrics() { const rect = canvas.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1; if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) { canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr); } ctx.setTransform(dpr, 0, 0, dpr, 0, 0); return { width: rect.width, height: rect.height }; }
  function tickStep(span) { if (span <= 12) return 1; if (span <= 24) return 2; if (span <= 60) return 5; if (span <= 120) return 10; return Math.pow(10, Math.floor(Math.log10(span / 8))); }
  function drawLabel(text, x, y, color, metrics) { ctx.save(); ctx.font = '600 10px Inter, sans-serif'; const width = ctx.measureText(text).width + 12; const left = Math.max(5, Math.min(x + 8, metrics.width - width - 5)); const top = Math.max(5, Math.min(y - 26, metrics.height - 22)); ctx.fillStyle = 'rgba(255,255,255,.94)'; ctx.strokeStyle = `${color}66`; ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect(left, top, width, 19, 5); ctx.fill(); ctx.stroke(); ctx.fillStyle = color; ctx.fillText(text, left + 6, top + 13); ctx.restore(); }

  function drawGraph() {
    const metrics = canvasMetrics(); const { width, height } = metrics; const pad = { left: 45, right: 18, top: 18, bottom: 32 }; const range = graphRange(); const plotW = width - pad.left - pad.right; const plotH = height - pad.top - pad.bottom; const sx = x => pad.left + ((x - range.xMin) / (range.xMax - range.xMin)) * plotW; const sy = y => pad.top + ((range.yMax - y) / (range.yMax - range.yMin)) * plotH;
    ctx.clearRect(0, 0, width, height); ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--plot-bg').trim() || '#fbfdfe'; ctx.fillRect(0, 0, width, height);
    const xStep = tickStep(range.xMax - range.xMin); const yStep = tickStep(range.yMax - range.yMin); ctx.save(); ctx.font = '500 9px "DM Mono", monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const firstX = Math.ceil(range.xMin / xStep) * xStep; for (let x = firstX; x <= range.xMax; x += xStep) { const px = sx(x); ctx.strokeStyle = x === 0 ? '#748fa1' : '#e5eff3'; ctx.lineWidth = x === 0 ? 1.25 : 1; ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, height - pad.bottom); ctx.stroke(); if (x !== 0) { ctx.fillStyle = '#8aa0ad'; ctx.fillText(fixed(x), px, height - 15); } }
    const firstY = Math.ceil(range.yMin / yStep) * yStep; ctx.textAlign = 'right'; for (let y = firstY; y <= range.yMax; y += yStep) { const py = sy(y); ctx.strokeStyle = y === 0 ? '#748fa1' : '#e5eff3'; ctx.lineWidth = y === 0 ? 1.25 : 1; ctx.beginPath(); ctx.moveTo(pad.left, py); ctx.lineTo(width - pad.right, py); ctx.stroke(); if (y !== 0) { ctx.fillStyle = '#8aa0ad'; ctx.fillText(fixed(y), pad.left - 8, py); } }
    if (range.yMin <= 0 && range.yMax >= 0) { ctx.fillStyle = '#527084'; ctx.textAlign = 'left'; ctx.font = '700 10px "DM Mono", monospace'; ctx.fillText('x', width - pad.right - 2, sy(0) - 9); }
    if (range.xMin <= 0 && range.xMax >= 0) { ctx.fillStyle = '#527084'; ctx.textAlign = 'right'; ctx.font = '700 10px "DM Mono", monospace'; ctx.fillText('y', sx(0) - 8, pad.top + 3); }
    ctx.restore();

    if (state.family === 'exponential' && state.k >= range.yMin && state.k <= range.yMax) { ctx.save(); ctx.setLineDash([6, 5]); ctx.strokeStyle = '#9b8dff'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(pad.left, sy(state.k)); ctx.lineTo(width - pad.right, sy(state.k)); ctx.stroke(); ctx.restore(); drawLabel(`asíntota y = ${fixed(state.k)}`, width - 145, sy(state.k), '#6d5bcf', metrics); }
    if (state.family === 'logarithmic' && state.h >= range.xMin && state.h <= range.xMax) { ctx.save(); ctx.setLineDash([6, 5]); ctx.strokeStyle = '#9b8dff'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(sx(state.h), pad.top); ctx.lineTo(sx(state.h), height - pad.bottom); ctx.stroke(); ctx.restore(); drawLabel(`asíntota x = ${fixed(state.h)}`, sx(state.h), pad.top + 30, '#6d5bcf', metrics); }

    ctx.save(); ctx.beginPath(); ctx.rect(pad.left, pad.top, plotW, plotH); ctx.clip(); ctx.beginPath(); const steps = Math.max(300, Math.round(plotW)); let drawing = false;
    for (let i = 0; i <= steps; i++) { const x = range.xMin + i / steps * (range.xMax - range.xMin); const y = evaluate(x); if (!Number.isFinite(y)) { drawing = false; continue; } if (!drawing) { ctx.moveTo(sx(x), sy(y)); drawing = true; } else ctx.lineTo(sx(x), sy(y)); }
    ctx.strokeStyle = '#0d9fc0'; ctx.lineWidth = 3.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = 'rgba(79, 226, 255, .34)'; ctx.shadowBlur = 8; ctx.stroke(); ctx.restore();

    const drawPoint = (x, y, color, radius = 5.5, border = '#ffffff') => { const px = sx(x); const py = sy(y); if (px < pad.left - 4 || px > width - pad.right + 4 || py < pad.top - 4 || py > height - pad.bottom + 4) return; ctx.save(); ctx.beginPath(); ctx.arc(px, py, radius, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = border; ctx.stroke(); ctx.restore(); };
    if (state.showKeyPoints) { const feature = getFeature(); if (feature.kind === 'point') { drawPoint(feature.x, feature.y, '#00a8cf', 6); drawLabel(`${feature.symbol}${formatPair(feature.x, feature.y)}`, sx(feature.x), sy(feature.y), '#007e9e', metrics); } else if (feature.kind === 'asymptote-horizontal') drawLabel(`y = ${fixed(feature.y)}`, sx(Math.min(range.xMax, feature.x + 2)), sy(feature.y), '#6d5bcf', metrics); else drawLabel(`x = ${fixed(feature.x)}`, sx(feature.x), sy(Math.min(range.yMax, feature.y + 2)), '#6d5bcf', metrics); roots().forEach((root, index) => { if (root >= range.xMin && root <= range.xMax) { drawPoint(root, 0, '#ff796d', 5.5); drawLabel(roots().length > 1 ? `cero ${index + 1}: ${fixed(root)}` : `cero: ${fixed(root)}`, sx(root), sy(0), '#cb574f', metrics); } }); if (validX(0) && Number.isFinite(evaluate(0))) drawPoint(0, evaluate(0), '#7662dd', 4.5); }
    if (state.selectedX !== null && validX(state.selectedX)) { const y = evaluate(state.selectedX); if (Number.isFinite(y)) { drawPoint(state.selectedX, y, '#b7ee6d', 7, '#203e20'); drawLabel(formatPair(state.selectedX, y), sx(state.selectedX), sy(y), '#4d7f1e', metrics); } }
    if (state.hover !== null && validX(state.hover.x)) { const y = evaluate(state.hover.x); if (Number.isFinite(y)) { drawPoint(state.hover.x, y, '#ffffff', 4.5, '#0d9fc0'); drawLabel(formatPair(state.hover.x, y), sx(state.hover.x), sy(y), '#177c96', metrics); } }
    canvas.dataset.range = JSON.stringify({ range, pad, width, height }); updateViewStatus();
  }

  function renderTable() { const points = getTableValues(); elements.table.innerHTML = points.map(({ x, y }) => { const selected = state.selectedX !== null && Math.abs(x - state.selectedX) < 1e-7; return `<tr class="${selected ? 'is-selected' : ''}" data-x="${x}"><td><button class="row-button" type="button" data-x="${x}" aria-label="Seleccionar x igual a ${fixed(x)}">${fixed(x)}</button></td><td><strong>${fixed(y)}</strong></td><td>${formatPair(x, y)}</td></tr>`; }).join('');
    elements.table.querySelectorAll('tr').forEach(row => row.addEventListener('click', () => { const x = Number(row.dataset.x); state.selectedX = x; renderTable(); drawGraph(); elements.selectedPoint.innerHTML = `<strong>${formatPair(x, evaluate(x))}</strong> aparece en la tabla y como punto destacado en la gráfica.`; }));
  }

  function renderAlgebra() { const cards = algebraCards(); const targets = [[elements.canonical, elements.formLabel1, elements.canonicalDescription], [elements.standard, elements.formLabel2, elements.standardDescription], [elements.factored, elements.formLabel3, elements.factoredDescription]]; cards.forEach((card, index) => { const [formula, label, description] = targets[index]; formula.textContent = card.formula; label.textContent = card.label; description.innerHTML = `${escapeHtml(card.before)} <strong>${escapeHtml(card.emphasis)}</strong>: <span>${escapeHtml(card.clue)}</span>`; }); const feature = getFeature(); elements.graphCallout.innerHTML = `<span class="callout-number">↗</span><p><strong>${escapeHtml(feature.name)} ${feature.kind === 'point' ? formatPair(feature.x, feature.y) : `${feature.symbol} ${fixed(feature.x ?? feature.y)}`}</strong><br><span>${escapeHtml(feature.description)}.</span></p>`; }
  function renderFamily() { const info = familyInfo[state.family]; document.querySelectorAll('.family-button').forEach(button => { const active = button.dataset.family === state.family; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); }); elements.familyDescription.textContent = info.description; elements.representationIntro.textContent = `Una ${info.label.toLowerCase()} en tres lentes: ecuación, tabla y gráfica. Compara qué información se lee mejor en cada forma.`; elements.controlIntro.textContent = info.intro; elements.controlsTitle.textContent = info.title; elements.graphTitle.textContent = info.graphTitle; elements.legend.innerHTML = `<span><i class="legend-vertex"></i> ${escapeHtml(info.featureName)}</span><span><i class="legend-root"></i> Ceros: f(x)=0</span>`; elements.aSymbol.textContent = state.family === 'linear' ? 'm' : 'a'; elements.aLabel.textContent = info.coefficient; elements.hLabel.textContent = info.hLabel; elements.kLabel.textContent = info.kLabel; elements.aHelp.textContent = info.coefficientHelp; elements.hHelp.textContent = info.hHelp; elements.kHelp.textContent = info.kHelp; canvas.setAttribute('aria-label', `Gráfica cartesiana interactiva de una función ${info.label.toLowerCase()}`); elements.practiceFamily.textContent = info.label; }
  function renderExamples() { const examples = examplesByFamily[state.family]; elements.exampleButtons.innerHTML = examples.map((example, index) => `<button class="example-button ${example.id === state.selectedExample ? 'is-active' : ''}" type="button" data-example="${example.id}" aria-pressed="${example.id === state.selectedExample}"><span class="example-index">0${index + 1}</span> ${escapeHtml(example.name)}</button>`).join(''); elements.exampleButtons.querySelectorAll('.example-button').forEach(button => button.addEventListener('click', () => applyExample(examples.find(item => item.id === button.dataset.example)))); }
  function renderControls() { elements.a.value = state.a; elements.h.value = state.h; elements.k.value = state.k; elements.aValue.textContent = fixed(state.a); elements.hValue.textContent = fixed(state.h); elements.kValue.textContent = fixed(state.k); }

  const option = (label, correct) => ({ label, correct });
  function uniqueOptions(items) { const unique = new Map(); items.forEach(item => { const previous = unique.get(item.label); if (!previous || item.correct) unique.set(item.label, item); }); return [...unique.values()]; }
  function challengeData() {
    const feature = getFeature(); const table = getTableValues(); const sample = table[(state.challengesVersion + 2) % table.length]; const zerosList = roots();
    const featureCorrect = state.family === 'linear' ? `m = ${fixed(state.a)} (pendiente constante)` : feature.kind === 'asymptote-horizontal' ? `Asíntota horizontal: y = ${fixed(state.k)}` : feature.kind === 'asymptote-vertical' ? `Asíntota vertical: x = ${fixed(state.h)}` : `${feature.symbol}${formatPair(feature.x, feature.y)}`;
    const featureDistractors = feature.kind === 'asymptote-horizontal' ? [`Asíntota horizontal: y = ${fixed(state.k + 1)}`, `Punto ${formatPair(state.h + 1, state.k + 1)}`] : feature.kind === 'asymptote-vertical' ? [`Asíntota vertical: x = ${fixed(state.h + 1)}`, `Dominio x < ${fixed(state.h)}`] : [`${feature.symbol}${formatPair(feature.x + 1, feature.y)}`, `${feature.symbol}${formatPair(feature.x, feature.y + 1)}`];
    const rootCorrect = zerosList.length ? zerosList.map(formatRoot).join(' y ') : 'No tiene solución real'; const rootAlternatives = zerosList.length ? [option(rootCorrect, true), ...[state.h, state.h + 1, state.h - 1, 0, 1, -1].filter(candidate => !zerosList.some(root => Math.abs(root - candidate) < 1e-8)).slice(0, 2).map(candidate => option(`x = ${fixed(candidate)}`, false))] : [option(rootCorrect, true), option('Tiene dos soluciones reales', false), option('La solución es x = 0', false)];
    const featurePrompt = state.family === 'linear' ? '¿Qué describe la pendiente de esta función lineal?' : state.family === 'logarithmic' ? `¿Qué frontera vertical organiza el dominio de ${formatCanonical()}?` : state.family === 'exponential' ? `¿A qué recta horizontal se aproxima ${formatCanonical()}?` : `¿Dónde está el punto notable de ${formatCanonical()}?`;
    return [{ type: `HUELLA ${familyInfo[state.family].label.toUpperCase()}`, title: `Un rasgo de la ${familyInfo[state.family].label.toLowerCase()}`, prompt: featurePrompt, options: state.family === 'linear' ? uniqueOptions([option(featureCorrect, true), option('El corte con x solamente', false), option('La asíntota vertical', false)]) : uniqueOptions([option(featureCorrect, true), ...featureDistractors.map(label => option(label, false))]), clue: state.family === 'logarithmic' ? `En una función logarítmica, x debe ser mayor que h y la curva se acerca a x = h.` : state.family === 'linear' ? 'En una función lineal, la pendiente mide el cambio de y cuando x aumenta una unidad.' : `Esta forma transformada deja ver ${featureCorrect}.` }, { type: 'ECUACIÓN f(x) = 0', title: 'Resuelve para encontrar los ceros', prompt: '¿Qué soluciones reales tiene la ecuación f(x) = 0?', options: uniqueOptions(rootAlternatives), clue: zerosList.length ? 'Los ceros son los valores de x que hacen que f(x) sea cero; en la gráfica se leen como cortes con el eje x.' : 'No hay soluciones reales: la gráfica no corta el eje x. En una exponencial puede acercarse al eje sin tocarlo.' }, { type: 'TABLA ↔ GRÁFICA', title: 'El mismo par ordenado', prompt: `Si x = ${fixed(sample.x)}, ¿qué punto de la tabla debe estar sobre la curva?`, options: uniqueOptions([option(formatPair(sample.x, sample.y), true), option(formatPair(sample.y, sample.x), false), option(formatPair(sample.x, sample.y + 1), false)]), clue: 'La tabla registra pares (x, f(x)); cada par es un punto de la gráfica.' }];
  }
  function shuffle(items) { return [...items].sort(() => Math.random() - 0.5); }
  function renderChallenges() { elements.challengeGrid.innerHTML = challengeData().map((challenge, index) => `<article class="challenge-card" data-challenge="${index}"><div class="challenge-type">${escapeHtml(challenge.type)}</div><h3>${escapeHtml(challenge.title)}</h3><p>${escapeHtml(challenge.prompt)}</p><div class="option-list" role="group" aria-label="Opciones para ${escapeHtml(challenge.title)}">${shuffle(challenge.options).map(answer => `<button type="button" class="challenge-option" data-correct="${answer.correct}" data-clue="${encodeURIComponent(challenge.clue)}">${escapeHtml(answer.label)}</button>`).join('')}</div><p class="challenge-feedback" aria-live="polite"></p></article>`).join(''); elements.challengeGrid.querySelectorAll('.challenge-option').forEach(button => button.addEventListener('click', () => checkAnswer(button))); }
  function checkAnswer(button) { const card = button.closest('.challenge-card'); const feedback = card.querySelector('.challenge-feedback'); const correct = button.dataset.correct === 'true'; card.querySelectorAll('.challenge-option').forEach(item => { item.disabled = true; if (item.dataset.correct === 'true') item.classList.add('is-correct'); }); if (correct) feedback.innerHTML = '<strong>Conexión lograda.</strong> Encontraste la pista que hace visible esta representación.'; else { button.classList.add('is-wrong'); feedback.innerHTML = `<strong>Casi.</strong> ${escapeHtml(decodeURIComponent(button.dataset.clue))}`; } }

  function updateViewStatus() { if (!elements.viewStatus) return; elements.viewStatus.textContent = state.view.mode === 'fit' ? 'Ajustada a los puntos' : 'Vista comparativa · misma escala'; }
  function updatePractice() { const x = Number(elements.practiceX.value); elements.practicePrompt.textContent = `Para ${formatCanonical()}, calcula f(${fixed(x)}) y comprueba tu resultado.`; }
  function updateAll() { elements.functionName.textContent = state.name; if (state.selectedX !== null) { const stillInTable = getTableValues().some(point => Math.abs(point.x - state.selectedX) < 1e-7); if (stillInTable) elements.selectedPoint.innerHTML = `<strong>${formatPair(state.selectedX, evaluate(state.selectedX))}</strong> aparece en la tabla y como punto destacado en la gráfica.`; else { state.selectedX = null; elements.selectedPoint.textContent = 'La tabla cambió con la función. Elige una fila para iluminar un punto nuevo.'; } } renderFamily(); renderExamples(); renderControls(); renderAlgebra(); renderTable(); renderChallenges(); updatePractice(); drawGraph(); }
  function applyExample(example) { Object.assign(state, example, { selectedExample: example.id, selectedX: null, hover: null, name: example.name }); resetView(); elements.selectedPoint.textContent = 'Elige una fila para conectar un punto de la tabla con la gráfica.'; updateAll(); }
  function randomizeFunction(namePrefix = 'Mi') { const aValues = [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2]; const hValues = [-3, -2, -1, 0, 1, 2, 3]; const kValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4]; const previous = `${state.a}|${state.h}|${state.k}`; let attempt = 0; do { state.a = aValues[Math.floor(Math.random() * aValues.length)]; state.h = hValues[Math.floor(Math.random() * hValues.length)]; state.k = kValues[Math.floor(Math.random() * kValues.length)]; if (state.family === 'logarithmic' && state.h > 2) state.h = 1; attempt += 1; } while (`${state.a}|${state.h}|${state.k}` === previous && attempt < 12); state.name = `${namePrefix} ${familyInfo[state.family].label.toLowerCase()}`; state.selectedExample = 'custom'; state.selectedX = null; state.hover = null; resetView(); }

  document.querySelectorAll('.family-button').forEach(button => button.addEventListener('click', () => { const family = button.dataset.family; const example = examplesByFamily[family][0]; state.family = family; applyExample({ ...example, family, selectedExample: example.id }); }));
  [elements.a, elements.h, elements.k].forEach(slider => slider.addEventListener('input', () => { const nextA = Number(elements.a.value); state.a = Math.abs(nextA) < 0.1 ? (nextA < 0 ? -0.25 : 0.25) : nextA; state.h = Number(elements.h.value); state.k = Number(elements.k.value); state.selectedExample = 'custom'; state.name = `Exploración ${familyInfo[state.family].label.toLowerCase()}`; if (state.view.mode === 'compare') state.view.xCenter = state.family === 'logarithmic' ? state.h + 6 : state.h; updateAll(); }));
  elements.keypoints.addEventListener('change', () => { state.showKeyPoints = elements.keypoints.checked; drawGraph(); });
  document.getElementById('reset-button').addEventListener('click', () => { const example = examplesByFamily[state.family].find(item => item.id === state.selectedExample) || examplesByFamily[state.family][0]; applyExample(example); });
  document.getElementById('random-button').addEventListener('click', () => { randomizeFunction('Mi'); elements.selectedPoint.textContent = 'Nueva función creada. Elige una fila y localiza ese punto en la gráfica.'; updateAll(); });
  document.getElementById('new-challenges').addEventListener('click', () => { state.challengesVersion += 1; randomizeFunction('Reto'); elements.selectedPoint.textContent = 'La función cambió para este reto. Conecta otra vez tabla, gráfica y ecuación.'; updateAll(); });
  document.getElementById('practice-new-function').addEventListener('click', () => { randomizeFunction('Práctica'); elements.practiceResult.textContent = 'Nueva función lista. Elige un valor permitido de x.'; updateAll(); document.getElementById('creador').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  document.getElementById('practice-x').addEventListener('input', updatePractice);
  document.getElementById('practice-check').addEventListener('click', () => { const x = Number(elements.practiceX.value); const y = evaluate(x); if (!Number.isFinite(y)) { elements.practiceResult.innerHTML = '<strong>Ese valor no pertenece al dominio.</strong> En esta función logarítmica debes elegir x mayor que h.'; return; } elements.practiceResult.innerHTML = `<strong>Comprobación:</strong> f(${fixed(x)}) = ${fixed(y)}. Busca el punto ${formatPair(x, y)} en la gráfica o en la tabla.`; state.selectedX = getTableValues().some(point => Math.abs(point.x - x) < 1e-7) ? x : null; renderTable(); drawGraph(); });

  const viewButtons = { 'view-zoom-out': () => { state.view.mode = 'compare'; state.view.xSpan = Math.min(30, state.view.xSpan * 1.25); state.view.ySpan = Math.min(30, state.view.ySpan * 1.25); }, 'view-zoom-in': () => { state.view.mode = 'compare'; state.view.xSpan = Math.max(4, state.view.xSpan / 1.25); state.view.ySpan = Math.max(4, state.view.ySpan / 1.25); }, 'view-left': () => { state.view.mode = 'compare'; state.view.xCenter -= state.view.xSpan * 0.12; }, 'view-right': () => { state.view.mode = 'compare'; state.view.xCenter += state.view.xSpan * 0.12; }, 'view-up': () => { state.view.mode = 'compare'; state.view.yCenter += state.view.ySpan * 0.12; }, 'view-down': () => { state.view.mode = 'compare'; state.view.yCenter -= state.view.ySpan * 0.12; }, 'view-compare': () => resetView(), 'view-fit': () => fitView() };
  Object.entries(viewButtons).forEach(([id, action]) => document.getElementById(id).addEventListener('click', () => { action(); drawGraph(); }));

  canvas.addEventListener('pointerdown', event => { canvas.setPointerCapture(event.pointerId); state.drag = { startX: event.clientX, startY: event.clientY, xCenter: state.view.xCenter, yCenter: state.view.yCenter }; });
  canvas.addEventListener('pointermove', event => { const data = JSON.parse(canvas.dataset.range || '{}'); if (!data.range) return; const rect = canvas.getBoundingClientRect(); if (state.drag) { const dx = event.clientX - state.drag.startX; const dy = event.clientY - state.drag.startY; state.view.mode = 'compare'; state.view.xCenter = state.drag.xCenter - dx / (data.width - data.pad.left - data.pad.right) * data.range.xSpan; state.view.yCenter = state.drag.yCenter + dy / (data.height - data.pad.top - data.pad.bottom) * data.range.ySpan; drawGraph(); return; } const { range, pad, width } = data; const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left - pad.left) / (width - pad.left - pad.right))); state.hover = { x: Math.round((range.xMin + ratio * (range.xMax - range.xMin)) * 4) / 4 }; elements.canvasNote.textContent = validX(state.hover.x) ? `x = ${fixed(state.hover.x)} · f(x) = ${fixed(evaluate(state.hover.x))}` : 'Fuera del dominio: x debe ser mayor que h'; drawGraph(); });
  canvas.addEventListener('pointerup', event => { state.drag = null; canvas.releasePointerCapture?.(event.pointerId); });
  canvas.addEventListener('pointerleave', () => { if (!state.drag) { state.hover = null; elements.canvasNote.textContent = 'Arrastra para recorrer · rueda para acercar · ← → inspecciona.'; drawGraph(); } });
  canvas.addEventListener('wheel', event => { event.preventDefault(); const factor = event.deltaY > 0 ? 1.12 : 0.89; state.view.mode = 'compare'; state.view.xSpan = Math.max(4, Math.min(30, state.view.xSpan * factor)); state.view.ySpan = Math.max(4, Math.min(30, state.view.ySpan * factor)); drawGraph(); }, { passive: false });
  canvas.addEventListener('keydown', event => { if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return; const data = JSON.parse(canvas.dataset.range || '{}'); if (!data.range) return; event.preventDefault(); const current = state.hover?.x ?? (state.family === 'logarithmic' ? state.h + 1 : 0); const step = event.shiftKey ? 1 : 0.25; const delta = event.key === 'ArrowRight' ? step : -step; const next = Math.max(data.range.xMin, Math.min(data.range.xMax, Math.round((current + delta) * 4) / 4)); state.hover = { x: next }; elements.canvasNote.textContent = validX(next) ? `x = ${fixed(next)} · f(x) = ${fixed(evaluate(next))} · ← → para recorrer` : 'Fuera del dominio'; drawGraph(); });
  canvas.addEventListener('focus', () => { if (!state.hover) state.hover = { x: state.family === 'logarithmic' ? state.h + 1 : 0 }; drawGraph(); });
  canvas.addEventListener('blur', () => { state.hover = null; drawGraph(); });
  window.addEventListener('resize', drawGraph);

  const themeToggle = document.getElementById('theme-toggle'); const themeLabel = document.getElementById('theme-toggle-label');
  function applyTheme(theme) { document.documentElement.dataset.theme = theme; const dark = theme === 'dark'; themeToggle.setAttribute('aria-pressed', String(dark)); themeToggle.setAttribute('aria-label', dark ? 'Activar tema claro' : 'Activar tema oscuro'); themeLabel.textContent = dark ? 'Tema claro' : 'Tema oscuro'; try { localStorage.setItem('funcionlab-theme', theme); } catch (_) {} drawGraph(); }
  let savedTheme = 'light'; try { savedTheme = localStorage.getItem('funcionlab-theme') || 'light'; } catch (_) {} applyTheme(savedTheme);
  themeToggle.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

  applyExample({ ...examplesByFamily.quadratic[0], family: 'quadratic' });

  const assistant = {
    launcher: document.getElementById('assistant-launcher'), panel: document.getElementById('assistant-panel'), close: document.getElementById('assistant-close'), form: document.getElementById('assistant-form'), input: document.getElementById('assistant-input'), send: document.getElementById('assistant-send'), messages: document.getElementById('assistant-messages'), status: document.getElementById('assistant-status'), suggestions: document.getElementById('assistant-suggestions'), history: []
  };
  function addAssistantMessage(text, role) { const node = document.createElement('div'); node.className = `assistant-message assistant-message-${role}`; node.textContent = text; assistant.messages.appendChild(node); assistant.messages.scrollTop = assistant.messages.scrollHeight; }
  function toggleAssistant(open) { assistant.panel.hidden = !open; assistant.launcher.setAttribute('aria-expanded', String(open)); if (open) assistant.input.focus(); }
  async function askAssistant(question) { addAssistantMessage(question, 'user'); assistant.history.push({ role: 'user', content: question }); assistant.input.value = ''; assistant.send.disabled = true; assistant.status.textContent = 'Pensando una explicación…'; try { const response = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: assistant.history, context: { family: document.querySelector('.family-button.is-active')?.textContent || '', expression: elements.canonical?.textContent || '' } }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || 'No se pudo consultar al asistente.'); const answer = data.answer || 'No encontré una respuesta clara.'; assistant.history.push({ role: 'assistant', content: answer }); addAssistantMessage(answer, 'bot'); assistant.status.textContent = 'Puedes hacer otra pregunta o probar una sugerencia.'; } catch (error) { addAssistantMessage(`No pude responder ahora. ${error.message} Puedes seguir usando la mesa de exploración y volver a intentarlo.`, 'bot'); assistant.status.textContent = 'El asistente necesita que el servidor esté disponible.'; } finally { assistant.send.disabled = false; assistant.input.focus(); } }
  assistant.launcher.addEventListener('click', () => toggleAssistant(assistant.panel.hidden)); assistant.close.addEventListener('click', () => toggleAssistant(false)); assistant.suggestions.querySelectorAll('button').forEach(button => button.addEventListener('click', () => askAssistant(button.textContent))); assistant.form.addEventListener('submit', event => { event.preventDefault(); const question = assistant.input.value.trim(); if (question) askAssistant(question); });
})();
