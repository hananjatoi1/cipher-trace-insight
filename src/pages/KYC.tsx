import { AlertTriangle, Lock, Shield, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function KYC() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground flex items-center gap-2">
          <Lock className="h-8 w-8 text-destructive" />
          KYC Tracing Module
        </h1>
        <p className="text-muted-foreground">Restricted access - Lawful investigation use only</p>
      </div>

      {/* Security Warning */}
      <div className="glass-card rounded-xl p-6 mb-6 border-destructive/30 bg-destructive/5">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-destructive mb-2">Security & Compliance Notice</h3>
            <div className="space-y-2 text-sm text-foreground">
              <p>⚠️ This module handles sensitive Personally Identifiable Information (PII)</p>
              <p>🔒 Access requires investigator role with proper authorization</p>
              <p>📋 All queries are logged with user ID, timestamp, and justification</p>
              <p>⚖️ Usage must comply with applicable data protection laws (GDPR, CCPA, etc.)</p>
              <p>🛡️ KYC data is encrypted at rest (AES-256) and in transit (TLS 1.3)</p>
              <p>⏰ Data retention: 90 days with secure deletion workflow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Access Control Notice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Role-Based Access</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Only investigators and admins can initiate KYC searches
          </p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Audit Logging</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            All actions logged with user, timestamp, and justification
          </p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Two-Person Rule</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Unredacted PII exports require approval from two users
          </p>
        </div>
      </div>

      {/* Search Interface */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">KYC Lookup</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Investigation Purpose (Required)</label>
            <Input
              placeholder="Enter investigation purpose and legal basis..."
              className="bg-background/50 border-border/50 focus:border-primary/50"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Search Query</label>
            <div className="flex gap-2">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name, phone, email, national ID, or passport number..."
                className="flex-1 bg-background/50 border-border/50 focus:border-primary/50 font-mono"
              />
              <Button className="bg-primary hover:bg-primary-glow text-primary-foreground px-8">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-background/30 border border-border/50">
          <p className="text-sm text-muted-foreground mb-2">⚖️ Legal Requirements:</p>
          <ul className="text-sm text-foreground space-y-1">
            <li>• Searches must be conducted under lawful authority</li>
            <li>• Data minimization principle applies - access only necessary information</li>
            <li>• Results may be subject to judicial review</li>
            <li>• Unauthorized access or misuse may result in legal consequences</li>
          </ul>
        </div>
      </div>

      {/* Mock Results (Redacted) */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Search Results (Redacted Preview)</h3>
        
        <div className="space-y-3">
          {[
            {
              confidence: 87,
              source: 'Sanctions List',
              matchType: 'Name + DOB',
              redactedInfo: 'J*** D** (DOB: ██/██/████)',
            },
            {
              confidence: 62,
              source: 'Exchange KYC',
              matchType: 'Phone Number',
              redactedInfo: 'Phone: +1-███-███-████',
            },
          ].map((result, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-background/30 border border-border/50 hover:bg-background/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono text-foreground mb-1">{result.redactedInfo}</p>
                  <p className="text-xs text-muted-foreground">
                    Source: {result.source} | Match Type: {result.matchType}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{result.confidence}%</p>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20"
                >
                  <Lock className="h-3 w-3 mr-2" />
                  Request Full PII
                </Button>
                <Button
                  size="sm"
                  className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
                >
                  <FileText className="h-3 w-3 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-primary">
            🔐 Full PII requires additional authorization and will trigger audit log entry with justification
          </p>
        </div>
      </div>
    </div>
  );
}
