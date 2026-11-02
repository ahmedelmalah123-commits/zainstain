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
  TrendingUp,
  Briefcase,
  Zap,
} from 'lucide-react';
import NeoDonutChart from './NeoDonutChart';
import NeoBarChart from './NeoBarChart';
import NeoTimelineChart from './NeoTimelineChart';
import {
  ANNOUNCED_TOTAL_TARGET,
  computeCombinedAnalytics,
  computeRealAnalytics,
  formatNumber,
} from '../../utils/analyticsHelper';

export default function AnalyticsView({
  registrations = [],
  syntheticRecords = [],
  onApplyFilter,
  activeFilter,
  onClearFilter,
}) {
  const [viewMode, setViewMode] = useState('combined'); // 'combined' | 'real_only'
  const [geoTab, setGeoTab] = useState('countries'); // 'countries' | 'governorates'

  // Combined 3,684 analytics
  const combinedAnalytics = computeCombinedAnalytics(registrations, syntheticRecords);
  // Real only analytics (58 real)
  const realAnalytics = computeRealAnalytics(registrations);

  const isCombined = viewMode === 'combined';
  const kpis = isCombined ? combinedAnalytics.kpis : null;

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
            <span>لوحة التحليلات والإحصائيات المتقدمة (Analytics Dashboard)</span>
          </div>
          <p className="analytics-subtitle">
            رؤية إحصائية متكاملة لـ 3,684 سجلًا بتوزيعات ديموغرافية وجغرافية وزمنية متطابقة
          </p>
        </div>

        <div className="analytics-mode-switcher">
          <span className="mode-switcher-label">نمط العرض:</span>
          <div className="mode-toggle-group">
            <button
              type="button"
              className={`btn-mode-toggle ${viewMode === 'combined' ? 'active sim' : ''}`}
              onClick={() => setViewMode('combined')}
            >
              <Target size={15} />
              <span>الرؤية الشاملة المكتملة (3,684)</span>
            </button>

            <button
              type="button"
              className={`btn-mode-toggle ${viewMode === 'real_only' ? 'active real' : ''}`}
              onClick={() => setViewMode('real_only')}
            >
              <Users size={15} />
              <span>المسجلون الحقيقيون فقط ({realAnalytics.total})</span>
            </button>
          </div>
        </div>
      </div>

      {/* COMBINED 3,684 BANNER NOTICE */}
      {isCombined ? (
        <div className="analytics-sim-notice">
          <div className="notice-icon">
            <Sparkles size={22} strokeWidth={2.5} />
          </div>
          <div className="notice-content">
            <div className="notice-headline">
              <strong>نموذج التحليلات المكتمل (3,684 سجلًا)</strong>
              <span className="sim-badge font-mono">Dataset Scope: 3,684 Records</span>
            </div>
            <p>
              يجمع هذا العرض بين <strong>{realAnalytics.total} تسجيلًا حقيقيًا موثقًا في قاعدة البيانات</strong> مع <strong>{3684 - realAnalytics.total} سجلًا اصطناعيًا تقديريًا</strong> بنموذج ديموغرافي وجغرافي وزمني متناسق.
              <span className="notice-subtag">السجلات الاصطناعية مصنفة تقنياً كـ <code>record_type: 'synthetic'</code> وغير قابلة للتواصل، بينما يتم التواصل مع الحقيقيين فقط.</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="analytics-sim-notice real-mode-notice">
          <div className="notice-icon">
            <Users size={22} strokeWidth={2.5} />
          </div>
          <div className="notice-content">
            <div className="notice-headline">
              <strong>إحصائيات قاعدة البيانات الفعلية الحية</strong>
              <span className="sim-badge font-mono live-badge">Live Supabase RPC</span>
            </div>
            <p>
              تعرض هذه الشاشة فقط السجلات الـ <strong>{realAnalytics.total}</strong> الحقيقية المسجلة عبر الموقع والتي يتم التواصل مع أصحابها عبر الواتساب.
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

      {/* 9 TOP KPI CARDS */}
      {isCombined ? (
        <section className="analytics-kpi-grid">
          {/* KPI 1: Total Registrations (3,684) */}
          <div className="kpi-card target-total">
            <div className="kpi-top">
              <span className="kpi-label">إجمالي التسجيلات</span>
              <span className="kpi-badge target">Total: 3,684</span>
            </div>
            <div className="kpi-value-row">
              <Target size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{formatNumber(kpis.totalRegistrations)}</span>
            </div>
            <div className="kpi-bottom-text">
              <span>{kpis.realCount} حقيقي 🟢 + {formatNumber(kpis.syntheticCount)} اصطناعي ⚙️</span>
            </div>
          </div>

          {/* KPI 2: Male Registrations */}
          <div
            className="kpi-card male-kpi clickable"
            onClick={() => handleChartDrilldown('gender', 'ذكور')}
            title="تصفية الذكور"
          >
            <div className="kpi-top">
              <span className="kpi-label">تسجيلات الذكور</span>
              <span className="kpi-badge male font-mono">{kpis.malePct}%</span>
            </div>
            <div className="kpi-value-row">
              <Users size={26} className="kpi-icon text-blue" />
              <span className="kpi-number font-mono">{formatNumber(kpis.maleCount)}</span>
            </div>
            <div className="kpi-bottom-text">
              من إجمالي 3,684 مسجلًا
            </div>
          </div>

          {/* KPI 3: Female Registrations */}
          <div
            className="kpi-card female-kpi clickable"
            onClick={() => handleChartDrilldown('gender', 'إناث')}
            title="تصفية الإناث"
          >
            <div className="kpi-top">
              <span className="kpi-label">تسجيلات الإناث</span>
              <span className="kpi-badge female font-mono">{kpis.femalePct}%</span>
            </div>
            <div className="kpi-value-row">
              <Users size={26} className="kpi-icon text-coral" />
              <span className="kpi-number font-mono">{formatNumber(kpis.femaleCount)}</span>
            </div>
            <div className="kpi-bottom-text">
              من إجمالي 3,684 مسجلًا
            </div>
          </div>

          {/* KPI 4: Total Countries */}
          <div
            className="kpi-card countries-kpi clickable"
            onClick={() => setGeoTab('countries')}
            title="عرض الدول"
          >
            <div className="kpi-top">
              <span className="kpi-label">إجمالي الدول</span>
              <span className="kpi-badge font-mono">6 دول</span>
            </div>
            <div className="kpi-value-row">
              <Globe2 size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">6</span>
            </div>
            <div className="kpi-bottom-text">
              مصر (70%)، السعودية، المغرب، فلسطين، الأردن، وأخرى
            </div>
          </div>

          {/* KPI 5: Graduates */}
          <div
            className="kpi-card graduates clickable"
            onClick={() => handleChartDrilldown('edu', 'خريجون')}
            title="تصفية الخريجين"
          >
            <div className="kpi-top">
              <span className="kpi-label">الخريجون</span>
              <span className="kpi-badge grad font-mono">{kpis.graduatesPct}%</span>
            </div>
            <div className="kpi-value-row">
              <GraduationCap size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{formatNumber(kpis.graduatesCount)}</span>
            </div>
            <div className="kpi-bottom-text">
              خريجو كليات هندسة وحاسبات ومجالات تقنية
            </div>
          </div>

          {/* KPI 6: University Students */}
          <div
            className="kpi-card students clickable"
            onClick={() => handleChartDrilldown('edu', 'طلاب جامعات')}
            title="تصفية طلاب الجامعات"
          >
            <div className="kpi-top">
              <span className="kpi-label">طلاب الجامعات</span>
              <span className="kpi-badge youth font-mono">{kpis.studentsPct}%</span>
            </div>
            <div className="kpi-value-row">
              <Users size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{formatNumber(kpis.studentsCount)}</span>
            </div>
            <div className="kpi-bottom-text">
              النسبة الكبرى من المسجلين (65%)
            </div>
          </div>

          {/* KPI 7: Employees */}
          <div
            className="kpi-card employees clickable"
            onClick={() => handleChartDrilldown('edu', 'عاملون ومحترفون')}
            title="تصفية العاملين والمحترفين"
          >
            <div className="kpi-top">
              <span className="kpi-label">عاملون ومحترفون</span>
              <span className="kpi-badge emp font-mono">{kpis.employeesPct}%</span>
            </div>
            <div className="kpi-value-row">
              <Briefcase size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{formatNumber(kpis.employeesCount)}</span>
            </div>
            <div className="kpi-bottom-text">
              مطورون، مهندسو نظم، ومستقلون (Freelancers)
            </div>
          </div>

          {/* KPI 8: Registration Growth */}
          <div className="kpi-card growth">
            <div className="kpi-top">
              <span className="kpi-label">معدل نمو التسجيلات</span>
              <span className="kpi-badge growth font-mono">Launch Peak</span>
            </div>
            <div className="kpi-value-row">
              <TrendingUp size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{kpis.registrationGrowth}</span>
            </div>
            <div className="kpi-bottom-text">
              ذروة الانطلاق: 1,180 في اليوم الأول
            </div>
          </div>

          {/* KPI 9: Daily Registration Average */}
          <div className="kpi-card avg">
            <div className="kpi-top">
              <span className="kpi-label">متوسط التسجيل اليومي</span>
              <span className="kpi-badge avg font-mono">7 Days</span>
            </div>
            <div className="kpi-value-row">
              <Zap size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{kpis.dailyAverage}</span>
            </div>
            <div className="kpi-bottom-text">
              تسجيل / يوم على مدار أسبوع الحملة
            </div>
          </div>
        </section>
      ) : (
        /* REAL 58 KPIS GRID */
        <section className="analytics-kpi-grid">
          <div className="kpi-card real-total">
            <div className="kpi-top">
              <span className="kpi-label">إجمالي المسجلين الحقيقيين</span>
              <span className="kpi-badge live">Live DB</span>
            </div>
            <div className="kpi-value-row">
              <Users size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{formatNumber(realAnalytics.total)}</span>
            </div>
            <div className="kpi-bottom-text">
              سجلات حقيقية موثقة في قاعدة البيانات
            </div>
          </div>

          <div className="kpi-card new-regs clickable" onClick={() => handleChartDrilldown('status', 'new')}>
            <div className="kpi-top">
              <span className="kpi-label">تسجيلات جديدة</span>
              <span className="kpi-badge new">بانتظار المتابعة</span>
            </div>
            <div className="kpi-value-row">
              <Clock size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{formatNumber(realAnalytics.newCount)}</span>
            </div>
            <div className="kpi-bottom-text">لم يتم التواصل معهم بعد</div>
          </div>

          <div className="kpi-card contacted clickable" onClick={() => handleChartDrilldown('status', 'contacted')}>
            <div className="kpi-top">
              <span className="kpi-label">تم التواصل معهم</span>
              <span className="kpi-badge contacted">مكتمل</span>
            </div>
            <div className="kpi-value-row">
              <CheckCircle2 size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{formatNumber(realAnalytics.contactedCount)}</span>
            </div>
            <div className="kpi-bottom-text">تم إرسال تفاصيل الكورس لهم واتساب</div>
          </div>

          <div className="kpi-card pending clickable" onClick={() => handleChartDrilldown('status', 'pending')}>
            <div className="kpi-top">
              <span className="kpi-label">لم يتم التواصل</span>
              <span className="kpi-badge pending">متبقي</span>
            </div>
            <div className="kpi-value-row">
              <AlertCircle size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{formatNumber(realAnalytics.pendingCount)}</span>
            </div>
            <div className="kpi-bottom-text">مطلوب إجراء محادثة معهم</div>
          </div>

          <div className="kpi-card rate">
            <div className="kpi-top">
              <span className="kpi-label">نسبة التواصل</span>
              <span className="kpi-badge rate font-mono">{realAnalytics.contactRate}%</span>
            </div>
            <div className="kpi-value-row">
              <Percent size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{realAnalytics.contactRate}%</span>
            </div>
            <div className="kpi-progress-bar-wrap">
              <div
                className="kpi-progress-fill"
                style={{ width: `${Math.min(Number(realAnalytics.contactRate) || 0, 100)}%` }}
              />
            </div>
          </div>

          <div className="kpi-card graduates clickable" onClick={() => handleChartDrilldown('edu', 'خريجون')}>
            <div className="kpi-top">
              <span className="kpi-label">الخريجون الفعليون</span>
              <span className="kpi-badge grad">مؤهلات عليا</span>
            </div>
            <div className="kpi-value-row">
              <GraduationCap size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{formatNumber(realAnalytics.graduatesCount)}</span>
            </div>
            <div className="kpi-bottom-text">من المسجلين الفعليين</div>
          </div>

          <div className="kpi-card students clickable" onClick={() => handleChartDrilldown('edu', 'طلاب')}>
            <div className="kpi-top">
              <span className="kpi-label">الطلاب الفعليون</span>
              <span className="kpi-badge youth">جامعات</span>
            </div>
            <div className="kpi-value-row">
              <Users size={26} className="kpi-icon" />
              <span className="kpi-number font-mono">{formatNumber(realAnalytics.studentsCount)}</span>
            </div>
            <div className="kpi-bottom-text">من المسجلين الفعليين</div>
          </div>
        </section>
      )}

      {/* 5 INTERACTIVE CHARTS GRID */}
      <section className="analytics-charts-grid">
        {/* 1. Gender Distribution (Donut Chart) */}
        <div className="chart-wrapper-card">
          <div className="chart-card-header">
            <div className="header-info">
              <PieChart size={18} />
              <h4>توزيع النوع (Gender Distribution)</h4>
            </div>
            <span className="chart-sim-tag font-mono">
              {isCombined ? 'Total: 3,684' : `Real: ${realAnalytics.total}`}
            </span>
          </div>
          <p className="chart-desc">
            توزيع الذكور والإناث (اضغط على الفئة لتصفية السجلات)
          </p>
          <NeoDonutChart
            data={isCombined ? combinedAnalytics.genderData : realAnalytics.genderData}
            centerLabel="الإجمالي"
            centerValue={isCombined ? 3684 : realAnalytics.total}
            onSliceClick={(label) => handleChartDrilldown('gender', label)}
            activeValue={activeFilter?.type === 'gender' ? activeFilter.value : null}
          />
        </div>

        {/* 2. Educational Status (Donut Chart) */}
        <div className="chart-wrapper-card">
          <div className="chart-card-header">
            <div className="header-info">
              <Layers size={18} />
              <h4>الحالة التعليمية (Educational Status)</h4>
            </div>
            <span className="chart-sim-tag font-mono">
              {isCombined ? 'Total: 3,684' : `Real: ${realAnalytics.total}`}
            </span>
          </div>
          <p className="chart-desc">
            توزيع المسجلين بين طلاب جامعات، خريجين، وعاملين ومحترفين
          </p>
          <NeoDonutChart
            data={isCombined ? combinedAnalytics.eduData : realAnalytics.eduData}
            centerLabel="المسجلين"
            centerValue={isCombined ? 3684 : realAnalytics.total}
            onSliceClick={(label) => handleChartDrilldown('edu', label)}
            activeValue={activeFilter?.type === 'edu' ? activeFilter.value : null}
          />
        </div>

        {/* 3. Geographic Distribution (Bar Chart) */}
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
              <span className="chart-sim-tag font-mono">
                {isCombined ? 'Total: 3,684' : `Real: ${realAnalytics.total}`}
              </span>
            </div>
          </div>
          <p className="chart-desc">
            {geoTab === 'countries'
              ? 'توزيع المسجلين: مصر صاحبة النسبة الأكبر (70%)، تليها السعودية، المغرب، فلسطين، الأردن، ودول أخرى'
              : 'توزيع المسجلين حسب المحافظات الأكثر تسجيلًا'}
          </p>

          <NeoBarChart
            data={
              geoTab === 'countries'
                ? isCombined
                  ? combinedAnalytics.countryData
                  : realAnalytics.countryData
                : realAnalytics.govData
            }
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

        {/* 4. Age Distribution (Vertical Column/Bar Chart) */}
        <div className="chart-wrapper-card">
          <div className="chart-card-header">
            <div className="header-info">
              <Activity size={18} />
              <h4>الفئات العمرية (Age Distribution)</h4>
            </div>
            <span className="chart-sim-tag font-mono">
              {isCombined ? 'Total: 3,684' : `Real: ${realAnalytics.total}`}
            </span>
          </div>
          <p className="chart-desc">
            أقل من 18، 18-23 (الأغلبية 61%)، 24-28 (20%)، 29-40 (10%)، أكبر من 40 (4%)
          </p>
          <NeoBarChart
            data={isCombined ? combinedAnalytics.ageData : realAnalytics.ageData}
            mode="vertical"
            onBarClick={(label) => handleChartDrilldown('age', label)}
            activeValue={activeFilter?.type === 'age' ? activeFilter.value : null}
          />
        </div>

        {/* 5. Registration Timeline (7 Days Area/Line Chart) */}
        <div className="chart-wrapper-card wide-card">
          <div className="chart-card-header">
            <div className="header-info">
              <Calendar size={18} />
              <h4>مسار وزخم التسجيلات الزمني (7-Day Campaign Timeline)</h4>
            </div>
            <span className="chart-sim-tag font-mono">
              Sum = 3,684 Exact
            </span>
          </div>
          <p className="chart-desc">
            اليوم الأول (ذروة الإطلاق: 1,180)، اليوم الثاني (760)، ثم انخفاض تدريجي واستقرار في الأيام التالية — المجموع 3,684 بالضبط
          </p>
          <NeoTimelineChart
            data={isCombined ? combinedAnalytics.timelineData : realAnalytics.timelineData}
            title=""
            subtitle={
              isCombined
                ? 'إجمالي التسجيلات عبر الأيام = 3,684 تسجيل (متوسط 526/يوم)'
                : `التراكم الفعلي: ${realAnalytics.total} تسجيل`
            }
          />
        </div>
      </section>
    </div>
  );
}
