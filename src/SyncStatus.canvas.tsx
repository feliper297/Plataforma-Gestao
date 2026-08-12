import React from 'react';

export default function SyncStatus() {
  const components = [
    {
      name: 'Button',
      status: 'synced',
      changes: [
        { item: 'Small', old: '32px', new: '36px (h-9)', status: '✅' },
        { item: 'Medium', old: '36px', new: '44px (h-11)', status: '✅' }
      ],
      details: 'Primary (#7F358A), Secondary (#FFF), Destructive (#E7000B), Ghost. Estados: Default, Hover, Disabled.'
    },
    {
      name: 'Badge',
      status: 'synced',
      changes: [
        { item: 'All variants', old: '—', new: 'Em sincronia', status: '✅' }
      ],
      details: 'Success, Warning, Destructive, Brand, Outline (Small e Medium)'
    },
    {
      name: 'Input',
      status: 'synced',
      changes: [
        { item: 'Default', old: '40px', new: '40px (h-10)', status: '✅' },
        { item: 'Search', old: '36px', new: '36px', status: '✅' }
      ],
      details: 'Estados: Default, Focus, Error, Disabled'
    },
    {
      name: 'Textarea',
      status: 'synced',
      changes: [
        { item: 'Height', old: '80px', new: '80px', status: '✅' }
      ],
      details: 'Estados: Focus, Error, Disabled'
    },
    {
      name: 'Switch',
      status: 'synced',
      changes: [
        { item: 'Dimensions', old: '36x20px', new: '36x20px', status: '✅' }
      ],
      details: 'Checked (Purple #7F358A) / Unchecked (Gray)'
    },
    {
      name: 'Tab',
      status: 'synced',
      changes: [
        { item: 'Height', old: '46px', new: '46px', status: '✅' }
      ],
      details: 'Estados: Default, Active (2px purple border), Disabled'
    },
    {
      name: 'SidebarItem',
      status: 'synced',
      changes: [
        { item: 'Height', old: '32px', new: '32px', status: '✅' }
      ],
      details: 'Estados: Default (gray), Active (purple background)'
    },
    {
      name: 'FilterPill',
      status: 'synced',
      changes: [
        { item: 'Height', old: '28px', new: '28px', status: '✅' }
      ],
      details: 'Estados: Default (light gray), Active (purple)'
    },
    {
      name: 'Card',
      status: 'synced',
      changes: [
        { item: 'Dimensions', old: '360x120px', new: '360x120px', status: '✅' }
      ],
      details: 'Container padrão'
    },
    {
      name: 'KpiCard',
      status: 'synced',
      changes: [
        { item: 'Dimensions', old: '240x106px', new: '240x106px', status: '✅' }
      ],
      details: 'Tons: Neutral, Brand, Negative, Positive'
    },
    {
      name: 'TableRow',
      status: 'synced',
      changes: [
        { item: 'Height', old: '47px', new: '47px', status: '✅' }
      ],
      details: 'Estados: Default, Hover, Selected'
    },
    {
      name: 'Dialog',
      status: 'synced',
      changes: [
        { item: 'Dimensions', old: '440x220px', new: '440x220px', status: '✅' }
      ],
      details: 'Modal padrão'
    }
  ];

  const statusColor = {
    synced: '#22c55e',
    pending: '#f59e0b',
    error: '#ef4444'
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', color: '#111827' }}>
            ✨ Sincronização Figma ↔ Sistema
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '16px' }}>
            Status: <strong style={{ color: '#22c55e' }}>✅ TODOS OS COMPONENTES SINCRONIZADOS</strong>
          </p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
            <span>📅 12/08/2026</span>
            <span>🔗 <a href="https://www.figma.com/design/glvWseJ80FSChqthEXTAQB/ajustes" target="_blank" rel="noopener noreferrer" style={{ color: '#7f358a', textDecoration: 'none' }}>Figma File</a></span>
            <span>📊 12 componentes</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#7f358a' }}>12</div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Componentes</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>12</div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Sincronizados</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#7f358a' }}>2</div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Ajustes principais</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>100%</div>
            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Conformidade</div>
          </div>
        </div>

        {/* Main Changes Highlight */}
        <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', padding: '16px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>🎯 Principais Mudanças</h3>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#92400e' }}>Button Small</div>\n              <div style={{ fontSize: '13px', color: '#b45309', marginTop: '2px' }}>32px → <strong>36px (h-9)</strong></div>
            </div>
            <div>\n              <div style={{ fontSize: '14px', color: '#92400e' }}>Button Medium</div>
              <div style={{ fontSize: '13px', color: '#b45309', marginTop: '2px' }}>36px → <strong>44px (h-11)</strong></div>
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {components.map((comp) => (
            <div
              key={comp.name}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  padding: '16px',
                  borderBottom: '1px solid #f3f4f6',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                  {comp.name}
                </h3>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: statusColor[comp.status],
                    backgroundColor: comp.status === 'synced' ? '#dcfce7' : '#fef3c7',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {comp.status === 'synced' ? '✅ Sincronizado' : '⏳ Pendente'}
                </span>
              </div>

              {/* Changes */}
              <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
                {comp.changes.map((change, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: idx < comp.changes.length - 1 ? '12px' : '0',
                      fontSize: '13px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '500', color: '#374151' }}>{change.item}</div>
                      {change.old !== '—' && (
                        <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                          {change.old} → {change.new}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '14px' }}>{change.status}</div>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div style={{ padding: '12px 16px', backgroundColor: '#f9fafb', fontSize: '12px', color: '#6b7280' }}>
                {comp.details}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
          <p>✨ Design System Guardian — Sincronização automática Figma ↔ Tailwind CSS</p>
          <p style={{ marginTop: '8px', fontSize: '12px' }}>
            Relatório completo: <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>SYNC_REPORT.md</code>
          </p>
        </div>
      </div>
    </div>
  );
}
