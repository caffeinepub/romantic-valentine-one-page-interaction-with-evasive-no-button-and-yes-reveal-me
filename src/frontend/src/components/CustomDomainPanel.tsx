import { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, Globe } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface CustomDomainPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomDomainPanel({ open, onOpenChange }: CustomDomainPanelProps) {
  const [customDomain, setCustomDomain] = useLocalStorage('custom-domain', '');
  const [domainInput, setDomainInput] = useState(customDomain);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const canisterHost = currentUrl.replace(/^https?:\/\//, '');

  useEffect(() => {
    setDomainInput(customDomain);
  }, [customDomain]);

  const handleSaveDomain = () => {
    setCustomDomain(domainInput.trim());
  };

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isSubdomain = domainInput.includes('.') && domainInput.split('.').length > 2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Custom Domain Setup
          </DialogTitle>
          <DialogDescription>
            Connect your own domain to this Internet Computer application
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current URL Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Current Application URL</CardTitle>
              <CardDescription>Your app is currently accessible at this Internet Computer URL</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Input value={currentUrl} readOnly className="font-mono text-sm" />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(currentUrl, 'current-url')}
                >
                  {copiedItem === 'current-url' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Custom Domain Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Your Custom Domain</Label>
              <div className="flex gap-2">
                <Input
                  id="domain"
                  placeholder="example.com or app.example.com"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  className="font-mono"
                />
                <Button onClick={handleSaveDomain}>Save</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter the domain you want to use (e.g., myapp.com or valentine.myapp.com)
              </p>
            </div>

            {customDomain && (
              <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  ✓ Domain saved: <span className="font-mono font-semibold">{customDomain}</span>
                </p>
              </div>
            )}
          </div>

          {/* DNS Configuration Instructions */}
          {domainInput && (
            <>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">DNS Configuration</CardTitle>
                  <CardDescription>
                    Add these DNS records at your domain registrar or DNS provider
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isSubdomain ? (
                    // Subdomain configuration
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Record Type</Label>
                        <div className="flex items-center gap-2">
                          <Input value="CNAME" readOnly className="font-mono text-sm" />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => copyToClipboard('CNAME', 'record-type')}
                          >
                            {copiedItem === 'record-type' ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Name / Host</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={domainInput.split('.')[0]}
                            readOnly
                            className="font-mono text-sm"
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => copyToClipboard(domainInput.split('.')[0], 'host')}
                          >
                            {copiedItem === 'host' ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Target / Value</Label>
                        <div className="flex items-center gap-2">
                          <Input value={canisterHost} readOnly className="font-mono text-sm" />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => copyToClipboard(canisterHost, 'target')}
                          >
                            {copiedItem === 'target' ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Apex domain configuration
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Note:</strong> Apex domains (e.g., example.com) require special DNS records. Check if your DNS provider supports ALIAS or ANAME records.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">Record Type</Label>
                          <div className="flex items-center gap-2">
                            <Input value="ALIAS or ANAME" readOnly className="font-mono text-sm" />
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => copyToClipboard('ALIAS', 'apex-type')}
                            >
                              {copiedItem === 'apex-type' ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            If your provider doesn't support ALIAS/ANAME, consider using a subdomain (e.g., www.{domainInput})
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">Name / Host</Label>
                          <div className="flex items-center gap-2">
                            <Input value="@" readOnly className="font-mono text-sm" />
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => copyToClipboard('@', 'apex-host')}
                            >
                              {copiedItem === 'apex-host' ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">Target / Value</Label>
                          <div className="flex items-center gap-2">
                            <Input value={canisterHost} readOnly className="font-mono text-sm" />
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => copyToClipboard(canisterHost, 'apex-target')}
                            >
                              {copiedItem === 'apex-target' ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 space-y-2">
                    <h4 className="text-sm font-semibold">Next Steps:</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Log in to your domain registrar or DNS provider</li>
                      <li>Add the DNS record with the values shown above</li>
                      <li>Wait for DNS propagation (typically 5-60 minutes, can take up to 48 hours)</li>
                      <li>Your custom domain will automatically work once DNS propagates</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Documentation Link */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href="/docs/custom-domain.md" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Detailed Documentation
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
