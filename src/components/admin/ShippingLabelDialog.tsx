import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Printer, Truck, Package, DollarSign, ExternalLink } from "lucide-react";

interface ShippingAddress {
  name?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

interface ShippingRate {
  object_id: string;
  provider: string;
  servicelevel: { name: string; token: string };
  amount: string;
  currency: string;
  estimated_days: number;
  duration_terms: string;
}

interface ShipmentResponse {
  rates: ShippingRate[];
  object_id: string;
}

interface LabelResult {
  status: string;
  tracking_number: string;
  label_url: string;
  tracking_url_provider: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: {
    id: string;
    order_number: string;
    shipping_address: unknown;
    items: unknown;
  } | null;
  onComplete: () => void;
}

const SENDER_ADDRESS = {
  name: "EnviroBiotics",
  street1: "123 Main St",
  city: "New York",
  state: "NY",
  zip: "10001",
  country: "US",
};

export function ShippingLabelDialog({ open, onOpenChange, order, onComplete }: Props) {
  const [step, setStep] = useState<"address" | "rates" | "label">("address");
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<string>("");
  const [labelResult, setLabelResult] = useState<LabelResult | null>(null);

  // Editable sender address
  const [senderAddress, setSenderAddress] = useState(SENDER_ADDRESS);

  const shippingAddr = (order?.shipping_address || {}) as ShippingAddress;

  const [recipientAddress, setRecipientAddress] = useState({
    name: shippingAddr.name || "",
    street1: shippingAddr.street1 || "",
    street2: shippingAddr.street2 || "",
    city: shippingAddr.city || "",
    state: shippingAddr.state || "",
    zip: shippingAddr.zip || "",
    country: shippingAddr.country || "US",
  });

  // Parcel dimensions
  const [parcel, setParcel] = useState({
    length: "10",
    width: "8",
    height: "4",
    weight: "2",
  });

  const resetState = () => {
    setStep("address");
    setRates([]);
    setSelectedRate("");
    setLabelResult(null);
  };

  const handleClose = (open: boolean) => {
    if (!open) resetState();
    onOpenChange(open);
  };

  const fetchRates = async () => {
    if (!recipientAddress.street1 || !recipientAddress.city || !recipientAddress.zip) {
      toast.error("Please fill in the recipient address");
      return;
    }

    setLoading(true);
    try {
      const res = await supabase.functions.invoke("shippo-shipping", {
        body: {
          action: "get-rates",
          addressFrom: senderAddress,
          addressTo: recipientAddress,
          parcels: [{
            length: parcel.length,
            width: parcel.width,
            height: parcel.height,
            distance_unit: "in",
            weight: parcel.weight,
            mass_unit: "lb",
          }],
        },
      });

      if (res.error) throw new Error(res.error.message);

      const shipment = res.data as ShipmentResponse;
      if (shipment.rates && shipment.rates.length > 0) {
        setRates(shipment.rates.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount)));
        setStep("rates");
      } else {
        toast.error("No shipping rates available for this address");
      }
    } catch (error: any) {
      console.error("Error fetching rates:", error);
      toast.error(error.message || "Failed to get shipping rates");
    } finally {
      setLoading(false);
    }
  };

  const createLabel = async () => {
    if (!selectedRate) {
      toast.error("Please select a shipping rate");
      return;
    }

    setLoading(true);
    try {
      const res = await supabase.functions.invoke("shippo-shipping", {
        body: {
          action: "create-label",
          rateId: selectedRate,
          orderId: order?.id,
        },
      });

      if (res.error) throw new Error(res.error.message);

      const transaction = res.data as LabelResult;
      if (transaction.status === "SUCCESS") {
        setLabelResult(transaction);
        setStep("label");
        toast.success("Shipping label created!");
        onComplete();
      } else {
        toast.error("Label creation failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Error creating label:", error);
      toast.error(error.message || "Failed to create shipping label");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-primary" />
            {step === "address" && "Create Shipping Label"}
            {step === "rates" && "Select Shipping Rate"}
            {step === "label" && "Label Ready!"}
          </DialogTitle>
          <DialogDescription>
            Order {order?.order_number}
          </DialogDescription>
        </DialogHeader>

        {step === "address" && (
          <div className="space-y-4 py-2">
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Package className="w-4 h-4" /> Parcel Dimensions
              </h3>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <Label className="text-xs">L (in)</Label>
                  <Input value={parcel.length} onChange={e => setParcel(p => ({ ...p, length: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs">W (in)</Label>
                  <Input value={parcel.width} onChange={e => setParcel(p => ({ ...p, width: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs">H (in)</Label>
                  <Input value={parcel.height} onChange={e => setParcel(p => ({ ...p, height: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs">Wt (lb)</Label>
                  <Input value={parcel.weight} onChange={e => setParcel(p => ({ ...p, weight: e.target.value }))} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Recipient Address</h3>
              <div className="space-y-2">
                <Input placeholder="Name" value={recipientAddress.name} onChange={e => setRecipientAddress(a => ({ ...a, name: e.target.value }))} />
                <Input placeholder="Street" value={recipientAddress.street1} onChange={e => setRecipientAddress(a => ({ ...a, street1: e.target.value }))} />
                <Input placeholder="Apt/Suite (optional)" value={recipientAddress.street2} onChange={e => setRecipientAddress(a => ({ ...a, street2: e.target.value }))} />
                <div className="grid grid-cols-3 gap-2">
                  <Input placeholder="City" value={recipientAddress.city} onChange={e => setRecipientAddress(a => ({ ...a, city: e.target.value }))} />
                  <Input placeholder="State" value={recipientAddress.state} onChange={e => setRecipientAddress(a => ({ ...a, state: e.target.value }))} />
                  <Input placeholder="ZIP" value={recipientAddress.zip} onChange={e => setRecipientAddress(a => ({ ...a, zip: e.target.value }))} />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "rates" && (
          <div className="space-y-3 py-2 max-h-[400px] overflow-y-auto">
            {rates.map((rate) => (
              <div
                key={rate.object_id}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  selectedRate === rate.object_id 
                    ? "border-primary bg-primary/5 ring-1 ring-primary" 
                    : "border-border hover:border-primary/40"
                }`}
                onClick={() => setSelectedRate(rate.object_id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-sm">{rate.provider}</span>
                    <span className="text-muted-foreground text-sm ml-2">{rate.servicelevel.name}</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-primary">
                    <DollarSign className="w-3.5 h-3.5" />
                    {rate.amount}
                  </div>
                </div>
                {rate.estimated_days > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Est. {rate.estimated_days} business day{rate.estimated_days > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {step === "label" && labelResult && (
          <div className="space-y-4 py-2">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-800">Label Created Successfully!</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tracking Number</span>
                <span className="font-mono font-semibold">{labelResult.tracking_number}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" asChild>
                <a href={labelResult.label_url} target="_blank" rel="noopener noreferrer">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Label (PDF)
                </a>
              </Button>
              {labelResult.tracking_url_provider && (
                <Button variant="outline" asChild>
                  <a href={labelResult.tracking_url_provider} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}

        <DialogFooter>
          {step === "address" && (
            <>
              <Button variant="outline" onClick={() => handleClose(false)}>Cancel</Button>
              <Button onClick={fetchRates} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Truck className="w-4 h-4 mr-2" />}
                Get Rates
              </Button>
            </>
          )}
          {step === "rates" && (
            <>
              <Button variant="outline" onClick={() => setStep("address")}>Back</Button>
              <Button onClick={createLabel} disabled={loading || !selectedRate}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Printer className="w-4 h-4 mr-2" />}
                Create Label
              </Button>
            </>
          )}
          {step === "label" && (
            <Button onClick={() => handleClose(false)}>Done</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
