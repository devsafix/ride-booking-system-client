/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Shield, Phone, User, Save } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetMeQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/auth/auth.api";

export default function SafetySettings() {
  const { data: me } = useGetMeQuery(undefined);
  const [updateUser] = useUpdateUserProfileMutation();
  const [contacts, setContacts] = useState([{ name: "", phone: "" }]);

  // load from profile
  useEffect(() => {
    if (me?.data?.emergencyContacts?.length) {
      setContacts(me.data.emergencyContacts);
    }
  }, [me]);

  // add new contact row
  const handleAddContact = () => {
    setContacts([...contacts, { name: "", phone: "" }]);
  };

  // remove contact
  const handleRemoveContact = (index: any) => {
    if (contacts.length > 1) {
      setContacts(contacts.filter((_, i) => i !== index));
    }
  };

  // save/update emergency contacts
  const handleSave = async () => {
    const validContacts = contacts.filter(
      (c) => c.name.trim() && c.phone.trim()
    );

    if (validContacts.length === 0) {
      toast.error("Please add at least one valid contact");
      return;
    }

    try {
      await updateUser({
        id: me?.data?._id,
        data: { emergencyContacts: validContacts },
      }).unwrap();
      toast.success("Emergency contacts updated successfully!");
    } catch {
      toast.error("Failed to update contacts");
    }
  };

  const validContactsCount = contacts.filter(
    (c) => c.name.trim() && c.phone.trim()
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-muted rounded-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Safety Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your emergency contacts and safety preferences
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {validContactsCount} Active Contacts
            </Badge>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Emergency Contacts Card */}
        <Card className="shadow-sm border-0 bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="w-5 h-5" />
              Emergency Contacts
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Add trusted contacts who can be reached in case of emergency
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Contacts List */}
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={index} className="group relative">
                  <div className="flex items-center gap-3 p-4 rounded-lg border bg-background/50 hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative">
                        <Input
                          value={contact.name}
                          placeholder="Contact name"
                          className="pl-3 bg-background border-border focus:border-ring"
                          onChange={(e) => {
                            const updated = [...contacts];
                            updated[index].name = e.target.value;
                            setContacts(updated);
                          }}
                        />
                      </div>

                      <div className="relative">
                        <Input
                          value={contact.phone}
                          placeholder="Phone number"
                          className="pl-3 bg-background border-border focus:border-ring"
                          onChange={(e) => {
                            const updated = [...contacts];
                            updated[index].phone = e.target.value;
                            setContacts(updated);
                          }}
                        />
                      </div>
                    </div>

                    {contacts.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveContact(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleAddContact}
                className="flex items-center gap-2 bg-background hover:bg-muted"
              >
                <Plus className="w-4 h-4" />
                Add New Contact
              </Button>

              <Button
                onClick={handleSave}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                disabled={validContactsCount === 0}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            {/* Info Banner */}
            <div className="mt-6 p-4 rounded-lg bg-muted/30 border-l-4 border-l-border">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Privacy & Security</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your emergency contacts are securely stored and encrypted.
                    They will only be contacted in genuine emergency situations.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
