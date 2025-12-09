import { ArrowRight } from "lucide-react";

interface NextStep {
  title: string;
  description: string;
  code: string;
}

interface NextStepsProps {
  steps: readonly NextStep[];
}

export function NextSteps({ steps }: NextStepsProps) {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Next Steps</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Follow these steps to start building your application with this
          starter kit
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  {step.title}
                  <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                <code className="inline-block px-3 py-1 bg-slate-900/80 border border-slate-700 rounded text-cyan-400 text-sm font-mono">
                  {step.code}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
