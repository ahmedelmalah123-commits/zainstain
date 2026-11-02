import React, { useState } from 'react';
import {
  Users,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle,
  Percent,
  GraduationCap,
  Sparkles,
  BarChart3,
  PieChart,
  Globe2,
  Activity,
  Layers,
  Building2,
  Calendar,
  X,
  Filter,
} from 'lucide-react';
import NeoDonutChart from './NeoDonutChart';
import NeoBarChart from './NeoBarChart';
import NeoTimelineChart from './NeoTimelineChart';
import {
  ANNOUNCED_TOTAL_TARGET,
  computeRealAnalytics,
  getSimulatedAnalytics,
  formatNumber,
} from '../../utils/analyticsHelper';

export default function AnalyticsView({
  registrations = [],
  onApplyFilter,
  activeFilter,
  onClearFilter,
}) {
  const [viewMode, setViewMode] = useState('real'); // 'real' | 'simulated'
  const [geoTab, setGeoTab] = useState('countries'); // 'countries' | 'governorates'

  // Real statistics computed live from actual database registrations
  const realAnalytics = computeRealAnalytics(registrations);

  // Simulated / Estimated model for the announced 3,684 target
  const simulatedAnalytics = getSimulatedAnalytics(registrations.length);

  // Current active dataset depending on selected viewMode
  const activeData = viewMode === 'real' ? realAnalytics : simulatedAnalytics;

  const handleChartDrilldown = (categoryType, value) => {
    if (!onApplyFilter) return;
    onApplyFilter({ type: categoryType, value });
  };

  return (
    <div className="analytics-view-container">
      {/* VIEW CONTROLS & MODE TOGGLE */}
      <div className="analytics-mode-header">
        <div className="mode-title-wrap">
          <div className="analytics-title-badge">
            <BarChart3 size={18} strokeWidth={2.5} />
            <span>لوحة التحليلات والإحصائيات المتقدمة</span>
          </div>
          <p className="analytics-subtitle">
            رؤية تحليلية شاملة للبيانات الديموغرافية والجغرافية ومؤشرات الأداء (KPIs)
          </p>
        </div>

        <div className="analytics-mode-switcher">
          <span className="mode-switcher-label">نمط العرض:</span>
          <div className="mode-toggle-group">
            <button
              type="button"
              className={`btn-mode-toggle ${viewMode === 'real' ? 'active real' : ''}`}
              onClick={() => setViewMode('real')}
            >
              <Users size={15} />
              <span>البيانات الحقيقية ({realAnalytics.total})</span>
            </button>

            <button
              type="button"
              className={`btn-mode-toggle ${viewMode === 'simulated' ? 'active sim' : ''}`}
              onClick={() => setViewMode('simulated')}
            >
              <Target size={15} />
              <span>الرؤية الشاملة المعلنة ({formatNumber(ANNOUNCED_TOTAL_TARGET)})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ESTIMATED / SIMULATION BANNER NOTICE (When in 3,684 Mode) */}
      {viewMode === 'simulated' && (
        <div className="analytics-sim-notice">
          <div className="notice-icon">
            <Sparkles size={20} strokeWidth={2.5} />
          </div>
          <div className="notice-content">
            <div className="notice-headline">
              <strong>نموذج إحصائي تقديري للمستهدف العام (3,684 تسجيلًا)</strong>
              <span className="sim-badge font-mono">Estimated / Simulated Data</span>
            </div>
            <p>
              هذه الرسوم البيانية والتوزيعات التقديرية تعكس النموذج الإحصائي المستهدف للدفعة.
              <strong> قاعدة البيانات الحقيقية تحتوي حاليًا على ({realAnalytics.total}) تسجيلًا معتمدًا</strong>،
              وقائمة المسجلين أدناه تضم فقط الحسابات الحقيقية دون أي بيانات وهمية.
            </p>
          </div>
        </div>
      )}

      {/* ACTIVE DRILL-DOWN FILTER CHIP */}
      {activeFilter && (
        <div className="active-filter-alert">
          <div className="filter-alert-info">
            <Filter size={16} />
            <span>تصفية نشطة حالياً: </span>
            <span className="filter-badge">
              {activeFilter.label || activeFilter.value}
            </span>
            <span className="filter-matches font-mono">
              (مطابق في البيانات الحقيقية: {registrations.filter((r) => activeFilter.matcher?.(r)).length || 0} تسجيل)
            </span>
          </div>
          <button
            type="button"
            className="btn-clear-filter"
            onClick={onClearFilter}
            title="إلغاء التصفية وعرض كل المسجلين"
          >
            <X size={14} strokeWidth={2.5} />
            <span>إلغاء التصفية</span>
          </button>
        </div>
      )}

      {/* TOP 8 KPI CARDS SECTION */}
      <section className="analytics-kpi-grid">
        {/* KPI 1: Announced Target Total */}
        <div className="kpi-card target-total">
          <div className="kpi-top">
            <span className="kpi-label">إجمالي التسجيلات المعلن</span>
            <span className="kpi-badge target">الهدف المعلن</span>
          </div>
          <div className="kpi-value-row">
            <Target size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">{formatNumber(ANNOUNCED_TOTAL_TARGET)}</span>
          </div>
          <div className="kpi-bottom-text">
            المستهدف العام للدفعة الأولى لكورس Zainstein
          </div>
        </div>

        {/* KPI 2: Real Database Total */}
        <div
          className="kpi-card real-total clickable"
          onClick={() => onClearFilter && onClearFilter()}
          title="اضغط لعرض كافة المسجلين الحقيقيين"
        >
          <div className="kpi-top">
            <span className="kpi-label">إجمالي التسجيلات الحقيقية</span>
            <span className="kpi-badge live">Live Database</span>
          </div>
          <div className="kpi-value-row">
            <Users size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">{formatNumber(realAnalytics.total)}</span>
          </div>
          <div className="kpi-bottom-text">
            <span>مسجل حقيقي في قاعدة البيانات</span>
            <span className="kpi-pct-chip font-mono">
              {((realAnalytics.total / ANNOUNCED_TOTAL_TARGET) * 100).toFixed(1)}% من المستهدف
            </span>
          </div>
        </div>

        {/* KPI 3: New Registrations */}
        <div
          className="kpi-card new-regs clickable"
          onClick={() => handleChartDrilldown('status', 'new')}
          title="اضغط لتصفية التسجيلات الجديدة"
        >
          <div className="kpi-top">
            <span className="kpi-label">التسجيلات الجديدة</span>
            <span className="kpi-badge new">بانتظار المتابعة</span>
          </div>
          <div className="kpi-value-row">
            <Clock size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">{formatNumber(activeData.newCount)}</span>
          </div>
          <div className="kpi-bottom-text">
            {viewMode === 'real'
              ? `${activeData.newCount} تسجيل لم يتم التواصل معه بعد`
              : 'تقدير الطلبات الجديدة قيد المعالجة'}
          </div>
        </div>

        {/* KPI 4: Contacted Registrations */}
        <div
          className="kpi-card contacted clickable"
          onClick={() => handleChartDrilldown('status', 'contacted')}
          title="اضغط لتصفية المسجلين الذين تم التواصل معهم"
        >
          <div className="kpi-top">
            <span className="kpi-label">تم التواصل معهم</span>
            <span className="kpi-badge contacted">مكتمل المتابعة</span>
          </div>
          <div className="kpi-value-row">
            <CheckCircle2 size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">{formatNumber(activeData.contactedCount)}</span>
          </div>
          <div className="kpi-bottom-text">
            {viewMode === 'real'
              ? `${activeData.contactedCount} طالب تم إرسال تفاصيل الكورس لهم`
              : 'تم التواصل وتأكيد الرغبة'}
          </div>
        </div>

        {/* KPI 5: Pending / Not Contacted */}
        <div
          className="kpi-card pending clickable"
          onClick={() => handleChartDrilldown('status', 'pending')}
          title="اضغط لتصفية التسجيلات المتبقية للتواصل"
        >
          <div className="kpi-top">
            <span className="kpi-label">لم يتم التواصل معهم</span>
            <span className="kpi-badge pending">قيد الانتظار</span>
          </div>
          <div className="kpi-value-row">
            <AlertCircle size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">{formatNumber(activeData.pendingCount)}</span>
          </div>
          <div className="kpi-bottom-text">
            مطلوب إجراء مكالمة أو رسالة واتساب لهم
          </div>
        </div>

        {/* KPI 6: Follow-up / Contact Rate % */}
        <div className="kpi-card rate">
          <div className="kpi-top">
            <span className="kpi-label">نسبة التواصل مع المسجلين</span>
            <span className="kpi-badge rate">معدل الإنجاز</span>
          </div>
          <div className="kpi-value-row">
            <Percent size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">{activeData.contactRate}%</span>
          </div>
          <div className="kpi-progress-bar-wrap">
            <div
              className="kpi-progress-fill"
              style={{ width: `${Math.min(Number(activeData.contactRate) || 0, 100)}%` }}
            />
          </div>
        </div>

        {/* KPI 7: Graduates Count */}
        <div
          className="kpi-card graduates clickable"
          onClick={() => handleChartDrilldown('edu', 'خريجون')}
          title="اضغط لتصفية الخريجين"
        >
          <div className="kpi-top">
            <span className="kpi-label">عدد الخريجين</span>
            <span className="kpi-badge grad">مؤهلات عليا</span>
          </div>
          <div className="kpi-value-row">
            <GraduationCap size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">{formatNumber(activeData.graduatesCount)}</span>
          </div>
          <div className="kpi-bottom-text">
            مهندسون، خريجو كليات حاسبات وعلوم ومجالات أخرى
          </div>
        </div>

        {/* KPI 8: Students & Youth */}
        <div
          className="kpi-card students clickable"
          onClick={() => handleChartDrilldown('edu', 'طلاب')}
          title="اضغط لتصفية الطلاب والشباب"
        >
          <div className="kpi-top">
            <span className="kpi-label">عدد الطلاب والشباب</span>
            <span className="kpi-badge youth">طلاب جامعات</span>
          </div>
          <div className="kpi-value-row">
            <Users size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">{formatNumber(activeData.studentsCount)}</span>
          </div>
          <div className="kpi-bottom-text">
            طلاب كليات الهندسة والحاسبات ومبتدئون في البرمجة
          </div>
        </div>
      </section>

      {/* ANALYTICS CHARTS SECTION */}
      <section className="analytics-charts-grid">
        {/* 1. Gender Distribution (Donut Chart) */}
        <div className="chart-wrapper-card">
          <div className="chart-card-header">
            <div className="header-info">
              <PieChart size={18} />
              <h4>توزيع النوع (Gender Distribution)</h4>
            </div>
            {viewMode === 'simulated' && (
              <span className="chart-sim-tag font-mono">Estimated</span>
            )}
          </div>
          <p className="chart-desc">
            نسبة الذكور والإناث من إجمالي المسجلين (اضغط على أي فئة للتصفية)
          </p>
          <NeoDonutChart
            data={activeData.genderData}
            centerLabel="إجمالي الفئة"
            centerValue={activeData.total}
            onSliceClick={(label) => handleChartDrilldown('gender', label)}
            activeValue={activeFilter?.type === 'gender' ? activeFilter.value : null}
          />
        </div>

        {/* 2. Educational Status (Donut / Progress Chart) */}
        <div className="chart-wrapper-card">
          <div className="chart-card-header">
            <div className="header-info">
              <Layers size={18} />
              <h4>الحالة التعليمية (Educational Status)</h4>
            </div>
            {viewMode === 'simulated' && (
              <span className="chart-sim-tag font-mono">Estimated</span>
            )}
          </div>
          <p className="chart-desc">
            توزيع المسجلين بين طلاب وخريجين وعاملين في التخصص
          </p>
          <NeoDonutChart
            data={activeData.eduData}
            centerLabel="إجمالي المسجلين"
            centerValue={activeData.total}
            onSliceClick={(label) => handleChartDrilldown('edu', label)}
            activeValue={activeFilter?.type === 'edu' ? activeFilter.value : null}
          />
        </div>

        {/* 3. Geographic Distribution (Countries & Governorates) */}
        <div className="chart-wrapper-card wide-card">
          <div className="chart-card-header">
            <div className="header-info">
              <Globe2 size={18} />
              <h4>التوزيع الجغرافي (Geographic Distribution)</h4>
            </div>
            <div className="geo-tabs">
              <button
                type="button"
                className={`btn-geo-tab ${geoTab === 'countries' ? 'active' : ''}`}
                onClick={() => setGeoTab('countries')}
              >
                الدول العربية
              </button>
              <button
                type="button"
                className={`btn-geo-tab ${geoTab === 'governorates' ? 'active' : ''}`}
                onClick={() => setGeoTab('governorates')}
              >
                محافظات مصر
              </button>
              {viewMode === 'simulated' && (
                <span className="chart-sim-tag font-mono">Estimated</span>
              )}
            </div>
          </div>
          <p className="chart-desc">
            {geoTab === 'countries'
              ? 'توزيع المسجلين حسب الدولة (مصر، السعودية، المغرب، فلسطين، الأردن، وباقي الدول)'
              : 'توزيع المسجلين حسب المحافظات المصرية الأكثر تسجيلًا'}
          </p>

          <NeoBarChart
            data={geoTab === 'countries' ? activeData.countryData : activeData.govData}
            mode="horizontal"
            onBarClick={(label) =>
              handleChartDrilldown(geoTab === 'countries' ? 'country' : 'governorate', label)
            }
            activeValue={
              activeFilter?.type === 'country' || activeFilter?.type === 'governorate'
                ? activeFilter.value
                : null
            }
            maxItems={10}
          />
        </div>

        {/* 4. Age Distribution (Vertical Column Chart) */}
        <div className="chart-wrapper-card">
          <div className="chart-card-header">
            <div className="header-info">
              <Activity size={18} />
              <h4>توزيع الفئات العمرية (Age Distribution)</h4>
            </div>
            {viewMode === 'simulated' && (
              <span className="chart-sim-tag font-mono">Estimated</span>
            )}
          </div>
          <p className="chart-desc">
            تقسيم الأعمار إلى فئات (أقل من 18، 18-23، 24-28، 29-40، أكبر من 40)
          </p>
          <NeoBarChart
            data={activeData.ageData}
            mode="vertical"
            onBarClick={(label) => handleChartDrilldown('age', label)}
            activeValue={activeFilter?.type === 'age' ? activeFilter.value : null}
          />
        </div>

        {/* 5. Registration Timeline & Growth (Line/Area Chart) */}
        <div className="chart-wrapper-card wide-card">
          <div className="chart-card-header">
            <div className="header-info">
              <Calendar size={18} />
              <h4>مسار وزخم التسجيلات (Registration Momentum)</h4>
            </div>
            {viewMode === 'simulated' && (
              <span className="chart-sim-tag font-mono">Estimated Target Curve</span>
            )}
          </div>
          <p className="chart-desc">
            {viewMode === 'real'
              ? 'تطور ومعدل التسجيلات اليومية الحقيقية وتراكم الأعداد في قاعدة البيانات'
              : 'منحنى النمو الزمني المستهدف للوصول إلى إجمالي 3,684 مسجل'}
          </p>
          <NeoTimelineChart
            data={activeData.timelineData}
            title=""
            subtitle={
              viewMode === 'real'
                ? `التراكم الفعلي: ${realAnalytics.total} مسجل`
                : 'التراكم المستهدف: 3,684 مسجل'
            }
          />
        </div>
      </section>
    </div>
  );
}
