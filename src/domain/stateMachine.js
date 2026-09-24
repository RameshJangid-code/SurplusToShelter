const allowed = { open: ['matched','expired','cancelled'], matched: ['accepted','expired','cancelled'], accepted: ['picked_up','expired','cancelled'], picked_up: ['delivered','expired'] };
export class InvalidTransitionError extends Error { constructor(from,to) { super(`Transition ${from} -> ${to} is not allowed`); this.name='InvalidTransitionError'; this.code='INVALID_TRANSITION'; } }
export function canTransition(from,to) { return (allowed[from] || []).includes(to); }
export function transition(from,to) { if (!canTransition(from,to)) throw new InvalidTransitionError(from,to); return to; }
