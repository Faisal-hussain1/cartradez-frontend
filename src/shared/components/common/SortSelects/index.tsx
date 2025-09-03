import {SortSelectsProps} from '@/shared/interfaces/inputs';

const SortSelects = ({
  sortValue,
  sortConfig,
  setSortField,
  setDirection,
}: SortSelectsProps) => {
  if (!sortConfig || Object.keys(sortConfig).length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        margin: '10px 0',
      }}
    >
      {/* Sorting Field Dropdown */}
      <select
        value={sortValue.sortBy || ''}
        onChange={(e) => setSortField(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
      >
        <option value='' disabled>
          Sort by...
        </option>
        {Object.entries(sortConfig.options).map(([key, option]) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Sorting Direction Dropdown */}
      <select
        value={sortValue.sortDir || ''}
        onChange={(e) => setDirection(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
      >
        <option value='' disabled>
          Direction...
        </option>
        {Object.entries(sortConfig.directions).map(([key, value]) => (
          <option key={key} value={value}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelects;
