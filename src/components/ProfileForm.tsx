import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import { User } from "@/types/types";
import { getCoordinates } from "@/utils/getDefaultAddress ";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ChangeLocation from "./ChangeLocation";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { generateId, generateImageUrl } from "@/utils/generateFakeProfiles";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be 100 characters or less"),
  avatar: z.string().url("Avatar must be a valid URL"),
  description: z.string().optional(),
  email: z.string().email("Email must be a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  jobTitle: z.string(),
  company: z.string(),
  interests: z.array(z.string()),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string(),
    country: z.string().min(1, "Country is required"),
    coordinates: z.tuple([
      z
        .number()
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90"),
      z
        .number()
        .min(-180, "Longitude must be between -180 and 180")
        .max(180, "Longitude must be between -180 and 180"),
    ]),
  }),
});

const ProfileForm = ({ className }: React.ComponentProps<"form">) => {
  const { toast } = useToast();
  const { state, dispatch } = useStore();
  const [fallbackAvatar] = useState(() => generateImageUrl());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: state.selectedUser?.fullName || "",
      avatar: state.selectedUser?.avatar || fallbackAvatar,
      description: state.selectedUser?.description || "",
      email: state.selectedUser?.email || "",
      phone: state.selectedUser?.phone || "",
      jobTitle: state.selectedUser?.jobTitle || "",
      company: state.selectedUser?.company || "",
      interests: state.selectedUser?.interests || [],
      address: {
        street: state.selectedUser?.address.street || "",
        city: state.selectedUser?.address.city || "",
        state: state.selectedUser?.address.state || "",
        postalCode: state.selectedUser?.address.postalCode || "",
        country: state.selectedUser?.address.country || "",
        coordinates: (
          getCoordinates(
            state.newAddress?.coordinates,
            state.selectedUser?.address.coordinates
          ) || [0, 0]
        ).slice(0, 2) as [number, number],
      },
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (state.newAddress) {
      const currentValues = form.getValues();
      console.log(currentValues);
      reset({
        ...currentValues,
        address: {
          ...currentValues.address,
          street:
            state.newAddress.street || currentValues.address?.street || "",
          city: state.newAddress.city || currentValues.address?.city || "",
          state: state.newAddress.state || currentValues.address?.state || "",
          postalCode:
            state.newAddress.postalCode ||
            currentValues.address?.postalCode ||
            "",
          country:
            state.newAddress.country || currentValues.address?.country || "",
          coordinates: (state.newAddress.coordinates as [number?, number?]) ||
            currentValues.address?.coordinates || [0, 0],
        },
      });
    }
  }, [state.newAddress, reset, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedProfile = {
      ...values,
      id: state.selectedUser?.id || generateId(),
    };

    console.log(updatedProfile);

    if (state.selectedUser === null) {
      dispatch({
        type: "NEW_PROFILE",
        payload: updatedProfile as User,
      });
    } else {
      dispatch({
        type: "UPDATE_PROFILE",
        payload: {
          user: updatedProfile as User,
        },
      });
    }
    toast({
      title: `${
        state.selectedUser === null ? "Added" : "Updated"
      } Successfully.`,
      description: `${updatedProfile.fullName} Profile`,
    });
  }

  console.log(form.formState.errors);

  function onDelete() {
    dispatch({
      type: "DELETE_PROFILE",
      payload: state.selectedUser?.id as string,
    });
    toast({
      title: "Delete Successfully",
      description: `${state.selectedUser?.fullName} Profile`,
    });
  }

  const isAdmin = state.isAdmin;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-6", className)}
      >
        {/* Full Name */}
        <div className="flex gap-6 items-center">
          <Avatar className="w-16 h-16">
            <AvatarImage src={state.selectedUser?.avatar || fallbackAvatar} />
          </Avatar>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <div className="flex-1">
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isAdmin}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
        </div>

        {/* Avatar URL */}
        {/* <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    readOnly={!isAdmin}
                    placeholder="https://avatar.url"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  readOnly={!isAdmin}
                  placeholder="Write a short bio..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full gap-2">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div className="flex-1">
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isAdmin}
                      placeholder="email@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <div className="flex-1">
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isAdmin}
                      placeholder="1234567890"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
        </div>

        <div className="flex w-full  gap-2">
          {/* Job Title */}
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <div className="flex-1">
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isAdmin}
                      placeholder="Software Engineer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          {/* Company */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <div className="flex-1">
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isAdmin}
                      placeholder="Your Company"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
        </div>

        {/* Interests */}
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <Input
                  value={
                    Array.isArray(field.value) ? field.value.join(", ") : ""
                  }
                  onChange={(e) => {
                    const interests = e.target.value
                      .split(",")
                      .map((i) => i.trim())
                      .filter(Boolean);
                    field.onChange(interests);
                  }}
                  readOnly={!isAdmin}
                  placeholder="Comma-separated interests"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Fields */}
        <div>
          <fieldset className="border border-zinc-400 rounded-md p-4">
            <legend>Address</legend>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={!isAdmin}
                        placeholder="123 Main St"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={!isAdmin}
                        placeholder="City Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={!isAdmin}
                        placeholder="State Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.postalCode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={!isAdmin}
                        placeholder="12345"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2 items-end">
              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={!isAdmin}
                        placeholder="Country Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isAdmin && <ChangeLocation />}
            </div>
          </fieldset>
        </div>

        {/* Submit Button */}
        {isAdmin && (
          <div className="flex gap-4">
            {state.selectedUser ? (
              <>
                <Button className="flex-1" type="submit">
                  Update
                </Button>
                <Button
                  className="flex-1 hover:bg-zinc-200"
                  variant={"secondary"}
                  type="button"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button className="flex-1 " type="submit">
                Add
              </Button>
            )}
          </div>
        )}
      </form>
    </Form>
  );
};

export default ProfileForm;
