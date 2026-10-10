import { describe, it, expect } from 'bun:test';
import { explainerProducts, explainerTrial } from './howItWorks';
describe('explainer product and trial rules', () => {
  it('Mini costs $98', () => expect(explainerProducts[0].price).toBe(98));
  it('Mini covers up to 300 sq ft', () => expect(explainerProducts[0].coverage).toBe(300));
  it('Mini noise limit is 25 dB', () => expect(explainerProducts[0].noiseDb).toBe(25));
  it('Biotica costs $299', () => expect(explainerProducts[1].price).toBe(299));
  it('Biotica covers up to 800 sq ft', () => expect(explainerProducts[1].coverage).toBe(800));
  it('Pro covers up to 25,000 sq ft', () => expect(explainerProducts[2].coverage).toBe(25000));
  it('trial lasts 30 days', () => expect(explainerTrial.days).toBe(30));
  it('trial starts at delivery', () => expect(explainerTrial.startsAt).toBe('delivery'));
  it('return shipping is covered', () => expect(explainerTrial.returnShippingPaid).toBe(true));
});
