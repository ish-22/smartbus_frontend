import { useBusStore } from '@/store/busStore';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { useLangStore } from '@/store/langStore';
import { t } from '@/utils/i18n';

function BusSearch() {
  const { query, setQuery, search, isLoading } = useBusStore();
  const [errors, setErrors] = useState<{ route?: string; from?: string; to?: string }>({});
  const { lang } = useLangStore();

  const validateForm = () => {
    const newErrors: { route?: string; from?: string; to?: string } = {};
    if (!query.route) newErrors.route = t('route_required', lang) || 'Route is required';
    if (!query.from) newErrors.from = t('from_required', lang) || 'Starting location is required';
    if (!query.to) newErrors.to = t('to_required', lang) || 'Destination is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      search();
    }
  };

  return (
  <div className="w-full max-w-full sm:max-w-4xl mx-auto p-2 sm:p-6 bg-gradient-to-br from-sky-50 to-lime-50 rounded-2xl shadow-lg border border-white/50 backdrop-blur-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-4 sm:mb-6 text-center">
        {t('plan_bus_journey', lang) || 'Plan Your Bus Journey'}
      </h2>
      <div className="mb-3 text-blue-700 text-sm text-center font-semibold">
        {t('normal_buses_tracking_only', lang) || 'Note: Normal route buses are tracking-only. You cannot book them in this system.'}
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        <div className="relative">
          <Input
            placeholder=" "
            value={query.route || ''}
            onChange={(e) => setQuery({ route: e.target.value })}
            className={`w-full p-4 sm:p-5 pt-6 sm:pt-7 border-2 ${
              errors.route ? 'border-rose-300' : 'border-slate-200'
            } rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-sky-300 bg-white/80 text-slate-700 placeholder-slate-400 transition-all peer text-base sm:text-lg shadow-sm`}
            aria-label="Bus Route"
            id="route"
            aria-invalid={!!errors.route}
            aria-describedby={errors.route ? 'route-error' : undefined}
          />
          <label
            htmlFor="route"
            className="absolute left-4 top-2 text-slate-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm bg-white/80 px-1 rounded"
          >
            {t('route', lang)}
          </label>
          <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-sky-400">
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          {errors.route && (
            <p id="route-error" className="text-rose-500 text-xs mt-2 ml-1">
              {errors.route}
            </p>
          )}
        </div>

        <div className="relative">
          <Input
            placeholder=" "
            value={query.number || ''}
            onChange={(e) => setQuery({ number: e.target.value })}
            className="w-full p-4 sm:p-5 pt-6 sm:pt-7 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-sky-300 bg-white/80 text-slate-700 placeholder-slate-400 transition-all peer text-base sm:text-lg shadow-sm"
            aria-label="Bus Number"
            id="number"
          />
          <label
            htmlFor="number"
            className="absolute left-4 top-2 text-slate-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm bg-white/80 px-1 rounded"
          >
            {t('bus_number', lang) || 'Bus Number'}
          </label>
          <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-sky-400">
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 19.382V8.618a1 1 0 00-1.447-.894L15 10m-6 0l6-3"
              />
            </svg>
          </span>
        </div>

        <div className="relative">
          <Input
            placeholder=" "
            value={query.from || ''}
            onChange={(e) => setQuery({ from: e.target.value })}
            className={`w-full p-4 sm:p-5 pt-6 sm:pt-7 border-2 ${
              errors.from ? 'border-rose-300' : 'border-slate-200'
            } rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-sky-300 bg-white/80 text-slate-700 placeholder-slate-400 transition-all peer text-base sm:text-lg shadow-sm`}
            aria-label="Starting Location"
            id="from"
            aria-invalid={!!errors.from}
            aria-describedby={errors.from ? 'from-error' : undefined}
          />
          <label
            htmlFor="from"
            className="absolute left-4 top-2 text-slate-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm bg-white/80 px-1 rounded"
          >
            {t('from', lang)}
          </label>
          <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-sky-400">
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          {errors.from && (
            <p id="from-error" className="text-rose-500 text-xs mt-2 ml-1">
              {errors.from}
            </p>
          )}
        </div>

        <div className="relative">
          <Input
            placeholder=" "
            value={query.to || ''}
            onChange={(e) => setQuery({ to: e.target.value })}
            className={`w-full p-4 sm:p-5 pt-6 sm:pt-7 border-2 ${
              errors.to ? 'border-rose-300' : 'border-slate-200'
            } rounded-xl focus:ring-2 focus:ring-sky-300 focus:border-sky-300 bg-white/80 text-slate-700 placeholder-slate-400 transition-all peer text-base sm:text-lg shadow-sm`}
            aria-label="Destination"
            id="to"
            aria-invalid={!!errors.to}
            aria-describedby={errors.to ? 'to-error' : undefined}
          />
          <label
            htmlFor="to"
            className="absolute left-4 top-2 text-slate-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-xs sm:peer-focus:text-sm bg-white/80 px-1 rounded"
          >
            {t('to', lang)}
          </label>
          <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-sky-400">
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          {errors.to && (
            <p id="to-error" className="text-rose-500 text-xs mt-2 ml-1">
              {errors.to}
            </p>
          )}
        </div>

        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 sm:py-5 rounded-xl text-white font-semibold transition-all duration-300 text-base sm:text-lg shadow-md ${
              isLoading
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-sky-400 to-lime-400 hover:from-sky-500 hover:to-lime-500 transform hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 sm:h-7 sm:w-7 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t('searching', lang) || 'Searching...'}
              </span>
            ) : (
              t('find_my_bus', lang) || 'Find My Bus'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BusSearch;

