import { Tracer, trace } from '@opentelemetry/api';
import { noopTracer } from './noop-tracer';
import { TelemetrySettings } from './telemetry-settings';

/**
 * Tracer variable for testing. Tests can set this to a mock tracer.
 */
let testTracer: Tracer | undefined = undefined;

export function setTestTracer(tracer: Tracer | undefined) {
  testTracer = tracer;
}

export function getTracer(telemetry?: Pick<TelemetrySettings, 'isEnabled' | 'getTracer'>): Tracer {
  const isEnabled = telemetry?.isEnabled ?? false;
  if (!isEnabled) {
    return noopTracer;
  }

  if (telemetry?.getTracer) {
    return telemetry?.getTracer();
  }

  if (testTracer) {
    return testTracer;
  }

  return trace.getTracer('ai');
}
