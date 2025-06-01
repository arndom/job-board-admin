export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applicants: {
        Row: {
          cover_letter_url: string | null
          created_at: string | null
          cv_url: string | null
          email: string
          id: string
          job_preferences: Json | null
          last_modified: string | null
          location: string | null
          name: string
          timezone: string | null
          trust_level: number | null
        }
        Insert: {
          cover_letter_url?: string | null
          created_at?: string | null
          cv_url?: string | null
          email: string
          id?: string
          job_preferences?: Json | null
          last_modified?: string | null
          location?: string | null
          name: string
          timezone?: string | null
          trust_level?: number | null
        }
        Update: {
          cover_letter_url?: string | null
          created_at?: string | null
          cv_url?: string | null
          email?: string
          id?: string
          job_preferences?: Json | null
          last_modified?: string | null
          location?: string | null
          name?: string
          timezone?: string | null
          trust_level?: number | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          applicant_id: string | null
          cover_letter_sentiment: string | null
          created_at: string | null
          cv_sentiment: string | null
          date_applied: string | null
          has_cover_letter: boolean | null
          has_cv: boolean | null
          id: string
          job_id: string | null
          last_modified: string | null
          match: number | null
          seniority_level: string | null
          status: Database["public"]["Enums"]["application_status"] | null
        }
        Insert: {
          applicant_id?: string | null
          cover_letter_sentiment?: string | null
          created_at?: string | null
          cv_sentiment?: string | null
          date_applied?: string | null
          has_cover_letter?: boolean | null
          has_cv?: boolean | null
          id?: string
          job_id?: string | null
          last_modified?: string | null
          match?: number | null
          seniority_level?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
        }
        Update: {
          applicant_id?: string | null
          cover_letter_sentiment?: string | null
          created_at?: string | null
          cv_sentiment?: string | null
          date_applied?: string | null
          has_cover_letter?: boolean | null
          has_cv?: boolean | null
          id?: string
          job_id?: string | null
          last_modified?: string | null
          match?: number | null
          seniority_level?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          benefits: string | null
          company_logo: string | null
          company_name: string
          company_size: string | null
          country: string | null
          created_at: string | null
          description: string | null
          id: string
          job_type: Database["public"]["Enums"]["job_type_enum"] | null
          last_modified: string | null
          location: string | null
          remote_type: Database["public"]["Enums"]["remote_type_enum"] | null
          requirements: string | null
          salary: string | null
          seniority_level:
            | Database["public"]["Enums"]["seniority_level_enum"]
            | null
          skills: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          timezone: string | null
          title: string
        }
        Insert: {
          benefits?: string | null
          company_logo?: string | null
          company_name: string
          company_size?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          job_type?: Database["public"]["Enums"]["job_type_enum"] | null
          last_modified?: string | null
          location?: string | null
          remote_type?: Database["public"]["Enums"]["remote_type_enum"] | null
          requirements?: string | null
          salary?: string | null
          seniority_level?:
            | Database["public"]["Enums"]["seniority_level_enum"]
            | null
          skills?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          timezone?: string | null
          title: string
        }
        Update: {
          benefits?: string | null
          company_logo?: string | null
          company_name?: string
          company_size?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          job_type?: Database["public"]["Enums"]["job_type_enum"] | null
          last_modified?: string | null
          location?: string | null
          remote_type?: Database["public"]["Enums"]["remote_type_enum"] | null
          requirements?: string | null
          salary?: string | null
          seniority_level?:
            | Database["public"]["Enums"]["seniority_level_enum"]
            | null
          skills?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          timezone?: string | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status: "callback" | "interviewing" | "rejected" | "hired"
      job_status: "open" | "interviewing" | "closed"
      job_type_enum: "full-time" | "part-time" | "contract" | "internship"
      remote_type_enum: "remote" | "hybrid" | "onsite"
      seniority_level_enum: "junior" | "mid-level" | "senior"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: ["callback", "interviewing", "rejected", "hired"],
      job_status: ["open", "interviewing", "closed"],
      job_type_enum: ["full-time", "part-time", "contract", "internship"],
      remote_type_enum: ["remote", "hybrid", "onsite"],
      seniority_level_enum: ["junior", "mid-level", "senior"],
    },
  },
} as const
