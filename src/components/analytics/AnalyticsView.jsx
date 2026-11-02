import React, { useState } from 'react';
import {
  Users,
  Target,
  Percent,
  GraduationCap,
  BarChart3,
  PieChart,
  Globe2,
  Activity,
  Layers,
  Calendar,
  X,
  Filter,
  TrendingUp,
  Briefcase,
  Zap,
  ArrowUpRight,
  GitCompare,
  Gauge,
  Compass,
} from 'lucide-react';
import NeoDonutChart from './NeoDonutChart';
import NeoBarChart from './NeoBarChart';
import NeoTimelineChart from './NeoTimelineChart';
import {
  computeCombinedAnalytics,
  formatNumber,
} from '../../utils/analyticsHelper';

export default function AnalyticsView({
  registrations = [],
  syntheticRecords = [],
  onApplyFilter,
  activeFilter,
  onClearFilter,
}) {
  const [geoTab, setGeoTab] = useState('countries'); // 'countries' | 'governorates'

  // Unified official 3,684 dataset
  const analytics = computeCombinedAnalytics(registrations, syntheticRecords);
  const { kpis, comparisons } = analytics;

  const handleChartDrilldown = (categoryType, value) => {
    if (!onApplyFilter) return;
    onApplyFilter({ type: categoryType, value });
  };

  return (
    <div className="analytics-view-container">
      {/* EXECUTIVE HEADER */}
      <div className="analytics-mode-header executive">
        <div className="mode-title-wrap">
          <div className="analytics-title-badge">
            <BarChart3 size={18} strokeWidth={2.5} />
            <span>لوحة التحليلات والمؤشرات الإحصائية</span>
          </div>
          <p className="analytics-subtitle">
            تحليل شامل لقاعدة بيانات المسجلين (إجمالي 3,684 مسجل) مع المؤشرات المقارنة والتوزيع الديموغرافي والجغرافي
          </p>
        </div>

        <div className="executive-cohort-pill font-mono">
          <Target size={15} />
          <span>إجمالي قاعدة البيانات: {formatNumber(kpis.totalRegistrations)}</span>
        </div>
      </div>

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

      {/* COMPARATIVE ANALYSIS KPIS SECTION */}
      <section className="comparative-metrics-section">
        <div className="section-mini-header">
          <GitCompare size={16} />
          <h4>مؤشرات المقارنة والتحليل المتقدم (Comparative Metrics)</h4>
        </div>

        <div className="comparative-cards-grid">
          {/* Compare 1: Gender Ratio */}
          <div className="compare-card">
            <div className="compare-card-top">
              <span className="compare-title">نسبة الذكور إلى الإناث</span>
              <span className="compare-ratio font-mono">{comparisons.maleToFemaleRatio}</span>
            </div>
            <div className="compare-progress-track">
              <div
                className="compare-progress-fill male"
                style={{ width: `${kpis.malePct}%` }}
                title={`ذكور: ${kpis.malePct}%`}
              />
              <div
                className="compare-progress-fill female"
                style={{ width: `${kpis.femalePct}%` }}
                title={`إناث: ${kpis.femalePct}%`}
              />
            </div>
            <div className="compare-footer-stats font-mono">
              <span className="stat-item text-blue">ذكور: {kpis.malePct}% ({formatNumber(kpis.maleCount)})</span>
              <span className="stat-item text-coral">إناث: {kpis.femalePct}% ({formatNumber(kpis.femaleCount)})</span>
            </div>
          </div>

          {/* Compare 2: Geographic Concentration */}
          <div className="compare-card">
            <div className="compare-card-top">
              <span className="compare-title">التركيز الجغرافي (محلي / إقليمي)</span>
              <span className="compare-ratio font-mono">{comparisons.domesticToRegionalRatio}</span>
            </div>
            <div className="compare-progress-track">
              <div
                className="compare-progress-fill domestic"
                style={{ width: `${comparisons.domesticShare}` }}
                title={`مصر: ${comparisons.domesticShare}`}
              />
              <div
                className="compare-progress-fill regional"
                style={{ width: `${comparisons.regionalShare}` }}
                title={`الدول العربية: ${comparisons.regionalShare}`}
              />
            </div>
            <div className="compare-footer-stats font-mono">
              <span className="stat-item">مصر: {comparisons.domesticShare}</span>
              <span className="stat-item">باقي الدول: {comparisons.regionalShare}</span>
            </div>
          </div>

          {/* Compare 3: Career Pipeline (Academic vs Professional) */}
          <div className="compare-card">
            <div className="compare-card-top">
              <span className="compare-title">المرحلة الدراسية والمهنية</span>
              <span className="compare-ratio font-mono">{comparisons.academicToWorkforceRatio}</span>
            </div>
            <div className="compare-progress-track">
              <div
                className="compare-progress-fill academic"
                style={{ width: `${comparisons.academicShare}` }}
                title={`طلاب جامعات: ${comparisons.academicShare}`}
              />
              <div
                className="compare-progress-fill workforce"
                style={{ width: `${comparisons.workforceShare}` }}
                title={`خريجون وعاملون: ${comparisons.workforceShare}`}
              />
            </div>
            <div className="compare-footer-stats font-mono">
              <span className="stat-item">طلاب: {comparisons.academicShare}</span>
              <span className="stat-item">خريجون ومحترفون: {comparisons.workforceShare}</span>
            </div>
          </div>

          {/* Compare 4: Core Demographic Peak (18 - 28) */}
          <div className="compare-card">
            <div className="compare-card-top">
              <span className="compare-title">الشريحة العمرية الأساسية (18 - 28)</span>
              <span className="compare-ratio font-mono">{comparisons.coreYouthPct}</span>
            </div>
            <div className="compare-progress-track">
              <div
                className="compare-progress-fill youth"
                style={{ width: `${comparisons.coreYouthPct}` }}
                title={`الشريحة الأساسية: ${comparisons.coreYouthPct}`}
              />
            </div>
            <div className="compare-footer-stats font-mono">
              <span className="stat-item">{formatNumber(comparisons.coreYouthTotal)} مسجل</span>
              <span className="stat-item">81% من إجمالي الدفعة</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE 9 KPI CARDS */}
      <section className="analytics-kpi-grid">
        {/* KPI 1: Total Registrations */}
        <div className="kpi-card target-total">
          <div className="kpi-top">
            <span className="kpi-label">إجمالي التسجيلات</span>
            <span className="kpi-badge target">Total Cohort</span>
          </div>
          <div className="kpi-value-row">
            <Target size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">{formatNumber(kpis.totalRegistrations)}</span>
          </div>
          <div className="kpi-bottom-text">
            إجمالي المسجلين في قاعدة بيانات البرنامج
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
            النسبة الأكبر من إجمالي المسجلين
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
            حضور متميز في مختلف التخصصات
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
            <span className="kpi-badge font-mono">6 Regions</span>
          </div>
          <div className="kpi-value-row">
            <Globe2 size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">6</span>
          </div>
          <div className="kpi-bottom-text">
            مصر والسعودية والمغرب وفلسطين والأردن ودول أخرى
          </div>
        </div>

        {/* KPI 5: University Students */}
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
            حاسبات وهندسة ومعلومات ومختلف الكليات
          </div>
        </div>

        {/* KPI 6: Graduates */}
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
            خريجو كليات تقنية وهندسية وعلمية
          </div>
        </div>

        {/* KPI 7: Employees & Professionals */}
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
            مطورون ومهندسو نظم ومستقلون
          </div>
        </div>

        {/* KPI 8: Launch Peak Velocity */}
        <div className="kpi-card growth">
          <div className="kpi-top">
            <span className="kpi-label">ذروة انطلاق الحملة</span>
            <span className="kpi-badge growth font-mono">Day 1 Peak</span>
          </div>
          <div className="kpi-value-row">
            <TrendingUp size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">{formatNumber(comparisons.launchPeakDay)}</span>
          </div>
          <div className="kpi-bottom-text">
            معدل تسارع 2.24 ضعف المتوسط اليومي
          </div>
        </div>

        {/* KPI 9: Daily Registration Average */}
        <div className="kpi-card avg">
          <div className="kpi-top">
            <span className="kpi-label">متوسط التسجيل اليومي</span>
            <span className="kpi-badge avg font-mono">7 Days</span>
          </div>
          <div className="kpi-value-row">
            <Activity size={26} className="kpi-icon" />
            <span className="kpi-number font-mono">{kpis.dailyAverage}</span>
          </div>
          <div className="kpi-bottom-text">
            تسجيل يومياً على مدار أيام الحملة
          </div>
        </div>
      </section>

      {/* 5 INTERACTIVE CHARTS GRID */}
      <section className="analytics-charts-grid">
        {/* 1. Gender Distribution (Donut Chart) */}
        <div className="chart-wrapper-card">
          <div className="chart-card-header">
            <div className="header-info">
              <PieChart size={18} />
              <h4>توزيع النوع (Gender Distribution)</h4>
            </div>
            <span className="chart-sim-tag font-mono">Total: 3,684</span>
          </div>
          <p className="chart-desc">
            توزيع الذكور والإناث (اضغط على الفئة لتصفية السجلات)
          </p>
          <NeoDonutChart
            data={analytics.genderData}
            centerLabel="الإجمالي"
            centerValue={3684}
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
            <span className="chart-sim-tag font-mono">Total: 3,684</span>
          </div>
          <p className="chart-desc">
            توزيع المسجلين بين طلاب جامعات، خريجين، وعاملين ومحترفين
          </p>
          <NeoDonutChart
            data={analytics.eduData}
            centerLabel="المسجلين"
            centerValue={3684}
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
                المحافظات
              </button>
              <span className="chart-sim-tag font-mono">Total: 3,684</span>
            </div>
          </div>
          <p className="chart-desc">
            {geoTab === 'countries'
              ? 'توزيع المسجلين حسب الدول العربية ومعدلات الانتشار'
              : 'توزيع المسجلين حسب المحافظات الأكثر تسجيلاً'}
          </p>

          <NeoBarChart
            data={geoTab === 'countries' ? analytics.countryData : analytics.govData}
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
              <h4>الفئات العمرية (Age Distribution)</h4>
            </div>
            <span className="chart-sim-tag font-mono">Total: 3,684</span>
          </div>
          <p className="chart-desc">
            أقل من 18، 18-23 (61%)، 24-28 (20%)، 29-40 (10%)، أكبر من 40 (4%)
          </p>
          <NeoBarChart
            data={analytics.ageData}
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
            <span className="chart-sim-tag font-mono">Sum = 3,684</span>
          </div>
          <p className="chart-desc">
            اليوم الأول (ذروة الإطلاق: 1,180)، ثم استقرار الحركة اليومية بمجموع 3,684 مسجل ومتوسط 526/يوم
          </p>
          <NeoTimelineChart
            data={analytics.timelineData}
            title=""
            subtitle="إجمالي التسجيلات عبر الأيام: 3,684 تسجيل"
          />
        </div>
      </section>
    </div>
  );
}
