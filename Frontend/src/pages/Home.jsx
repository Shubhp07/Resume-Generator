import {
  FileText,
  Zap,
  Download,
  Shield,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";


function home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">
              ResumePrep
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#templates"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Templates
            </a>
            <a
              href="#pricing"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              Pricing
            </a>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg"
            onClick={()=> navigate("/login")}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
            <Star className="w-4 h-4 fill-current" />
            <span>Trusted by 100,000+ professionals</span>
          </div>

          <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Build Your Perfect Resume in{" "}
            <span className="text-blue-600">Minutes</span>
          </h1>

          <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes with our intuitive
            builder. Stand out from the crowd and land your dream job faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-xl flex items-center justify-center gap-2 text-lg font-semibold">
              Start Building Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-slate-50 transition-all border-2 border-slate-200 hover:border-slate-300 flex items-center justify-center gap-2 text-lg font-semibold">
              View Examples
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="h-3 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-200 rounded"></div>
                <div className="h-3 bg-slate-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-blue-100 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                <div className="h-4 bg-slate-100 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section id="features" className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-slate-600">
              Powerful features designed to make resume building effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Zap className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-slate-600">
                Build your resume in under 10 minutes with our intuitive
                interface
              </p>
            </div>

            <div className="p-6 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                ATS Optimized
              </h3>
              <p className="text-slate-600">
                Pass applicant tracking systems with optimized formatting
              </p>
            </div>

            <div className="p-6 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <Download className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Export Anywhere
              </h3>
              <p className="text-slate-600">
                Download as PDF, Word, or share with a direct link
              </p>
            </div>

            <div className="p-6 rounded-xl hover:bg-slate-50 transition-colors group">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                <Shield className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Secure & Private
              </h3>
              <p className="text-slate-600">
                Your data is encrypted and never shared with third parties
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of successful job seekers who built their resumes
            with ResumeForge
          </p>
          <button className="px-10 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all hover:shadow-2xl text-lg font-semibold">
            Create Your Resume Now
          </button>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <FileText className="w-6 h-6 text-blue-500" />
              <span className="text-lg font-bold text-white">ResumeForge</span>
            </div>
            <p className="text-sm">© 2024 ResumeForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default home;
