import selectRangeDays from '../selectRangeDays';

describe('Algothim to chose the items range based some index', () => {
  const items = [1, 2, 3, 4, 5, 6, 7];

  it('first position', () => {
    expect(selectRangeDays(items, 0, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(selectRangeDays(items, 0, 3)).toEqual([1, 2, 3]);
    expect(selectRangeDays(items, 0, 1)).toEqual([1]);
  });

  it('last position', () => {
    expect(selectRangeDays(items, 6, 5)).toEqual([3, 4, 5, 6, 7]);
    expect(selectRangeDays(items, 6, 3)).toEqual([5, 6, 7]);
    expect(selectRangeDays(items, 6, 1)).toEqual([7]);
  });

  it('middle position', () => {
    expect(selectRangeDays(items, 3, 5)).toEqual([2, 3, 4, 5, 6]);
    expect(selectRangeDays(items, 3, 3)).toEqual([3, 4, 5]);
    expect(selectRangeDays(items, 3, 1)).toEqual([4]);
  });

  it('any other position near the end', () => {
    expect(selectRangeDays(items, 5, 5)).toEqual([3, 4, 5, 6, 7]);
    expect(selectRangeDays(items, 5, 3)).toEqual([5, 6, 7]);
    expect(selectRangeDays(items, 5, 1)).toEqual([6]);
  });

  it('any other position near the beginning', () => {
    expect(selectRangeDays(items, 2, 5)).toEqual([3, 4, 5, 6, 7]);
    expect(selectRangeDays(items, 2, 3)).toEqual([3, 4, 5]);
    expect(selectRangeDays(items, 2, 1)).toEqual([3]);
  });

  it('with odd quantity', () => {
    expect(selectRangeDays(items, 4, 5)).toEqual([3, 4, 5, 6, 7]);
    expect(selectRangeDays(items, 4, 3)).toEqual([5, 6, 7]);
    expect(selectRangeDays(items, 4, 1)).toEqual([5]);
  });
});
